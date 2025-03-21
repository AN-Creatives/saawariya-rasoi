
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface WebhookPayload {
  type: string;
  table: string;
  record: {
    id: string;
    customer_name: string;
    email: string;
    phone: string;
    address: string | null;
    order_type: string;
    order_items: OrderItem[];
    total_amount: number;
    status: string;
    order_notes: string | null;
    created_at: string;
    updated_at: string;
  };
  schema: string;
  old_record: null | any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    const whatsappApiKey = Deno.env.get('WHATSAPP_API_KEY') as string
    const adminPhone = Deno.env.get('ADMIN_PHONE') as string
    const adminEmail = Deno.env.get('ADMIN_EMAIL') as string

    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Extract the request body
    const payload: WebhookPayload = await req.json()

    // Only process new order insertions with takeaway type
    if (
      payload.type === 'INSERT' && 
      payload.table === 'orders' && 
      payload.record.order_type === 'takeaway'
    ) {
      const order = payload.record
      
      // Format order items for message
      const orderItemsText = order.order_items
        .map(item => `- ${item.name} x${item.quantity}: ₹${item.price.toFixed(2)}`)
        .join('\n')

      // Create WhatsApp message for admin
      const adminMessage = `
🔔 *New Takeaway Order*

*Order ID:* ${order.id}
*Customer:* ${order.customer_name}
*Phone:* ${order.phone}
*Email:* ${order.email}
*Order Type:* Takeaway
*Status:* ${order.status}
*Total Amount:* ₹${order.total_amount.toFixed(2)}

*Items:*
${orderItemsText}

${order.order_notes ? `*Notes:* ${order.order_notes}` : ''}

_Order received at ${new Date(order.created_at).toLocaleString()}_
      `.trim()

      // Create customer confirmation message
      const customerMessage = `
*Thank you for your order at Saawariya Rasoi!*

Your takeaway order has been received and is being prepared. Your order will be ready for pickup in approximately 15-20 minutes.

*Order Details:*
*Order ID:* ${order.id.substring(0, 8)}
*Total Amount:* ₹${order.total_amount.toFixed(2)}

Please show this message when you arrive to collect your order.

For any questions, please call us at: +911234567890
      `.trim()

      // Send WhatsApp message to admin via WhatsApp API
      if (whatsappApiKey && adminPhone) {
        try {
          console.log(`Sending WhatsApp notification to admin: ${adminPhone}`)
          
          // This is a placeholder for your actual WhatsApp API integration
          // You'll need to replace this with actual implementation for your WhatsApp provider
          const whatsappResponse = await fetch('https://your-whatsapp-api-endpoint.com/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${whatsappApiKey}`
            },
            body: JSON.stringify({
              phone: adminPhone,
              message: adminMessage
            })
          })
          
          console.log('WhatsApp notification sent to admin:', await whatsappResponse.text())
          
          // Send confirmation to customer if phone number is available
          if (order.phone) {
            console.log(`Sending WhatsApp confirmation to customer: ${order.phone}`)
            
            await fetch('https://your-whatsapp-api-endpoint.com/send', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${whatsappApiKey}`
              },
              body: JSON.stringify({
                phone: order.phone,
                message: customerMessage
              })
            })
            
            console.log('WhatsApp confirmation sent to customer')
          }
        } catch (err) {
          console.error('Error sending WhatsApp notification:', err)
        }
      } else {
        console.log('WhatsApp API key or Admin phone not configured, skipping WhatsApp notification')
      }

      // Send email notification to admin
      if (adminEmail) {
        console.log(`Sending email notification to admin: ${adminEmail}`)
        
        // This is a placeholder for your actual email sending implementation
        // You'll need to replace this with an actual email service like Resend or SendGrid
        try {
          // Example using a hypothetical email service
          const emailResponse = await fetch('https://your-email-api-endpoint.com/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Deno.env.get('EMAIL_API_KEY') || ''}`
            },
            body: JSON.stringify({
              to: adminEmail,
              subject: 'New Takeaway Order - Saawariya Rasoi',
              html: `<h1>New Takeaway Order</h1>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Customer:</strong> ${order.customer_name}</p>
                <p><strong>Phone:</strong> ${order.phone}</p>
                <p><strong>Email:</strong> ${order.email}</p>
                <p><strong>Order Type:</strong> Takeaway</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Total Amount:</strong> ₹${order.total_amount.toFixed(2)}</p>
                <h2>Items:</h2>
                <ul>
                  ${order.order_items.map(item => `<li>${item.name} x${item.quantity}: ₹${item.price.toFixed(2)}</li>`).join('')}
                </ul>
                ${order.order_notes ? `<p><strong>Notes:</strong> ${order.order_notes}</p>` : ''}
                <p><em>Order received at ${new Date(order.created_at).toLocaleString()}</em></p>`
            })
          })
          
          console.log('Email notification sent to admin')
        } catch (err) {
          console.error('Error sending email notification:', err)
        }
      } else {
        console.log('Admin email not configured, skipping email notification')
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Notification processed' }),
      { 
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error processing notification:', error)
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        status: 500 
      }
    )
  }
})
