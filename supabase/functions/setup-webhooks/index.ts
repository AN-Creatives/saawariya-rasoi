
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

serve(async (req) => {
  try {
    // Get the Authorization header from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing Authorization header' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Extract the token
    const token = authHeader.replace('Bearer ', '')
    
    // Verify the token matches our secret
    const webhookSecret = Deno.env.get('WEBHOOK_SETUP_SECRET')
    if (token !== webhookSecret) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    
    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Create or update the webhook that triggers on order insertions
    const { error: webhookError } = await supabase.rpc('supabase_functions.create_webhook', {
      function_name: 'order-notification',
      table_name: 'orders',
      events: ['INSERT'],
      webhook_enabled: true
    })
    
    if (webhookError) {
      throw webhookError
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Webhook setup completed' }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Error setting up webhook:', error)
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
