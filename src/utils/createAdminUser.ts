
import { supabase } from '@/integrations/supabase/client';

/**
 * Creates an admin user with the specified email and password
 * This is a utility function intended for initial setup only
 */
export async function createAdminUser(email: string, password: string, fullName: string = 'Admin') {
  try {
    // Check if the email is the authorized admin email
    if (email !== 'saawariyarasoi12@gmail.com') {
      throw new Error('Unauthorized: Only the designated admin email can be used');
    }

    // 1. Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (signUpError) {
      throw signUpError;
    }

    if (!signUpData.user) {
      throw new Error('User creation failed');
    }

    // 2. Update the user's role to admin in the profiles table
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', signUpData.user.id);

    if (updateError) {
      throw updateError;
    }

    return {
      success: true,
      user: signUpData.user,
      message: 'Admin user created successfully'
    };
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    return {
      success: false,
      message: error.message || 'Failed to create admin user',
      error
    };
  }
}
