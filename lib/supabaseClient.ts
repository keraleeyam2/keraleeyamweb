import { createClient } from "@supabase/supabase-js";

// Load Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Function to get a public image URL from Supabase Storage.
 * @param bucket - Name of the storage bucket
 * @param path - Path to the image file inside the bucket
 * @returns The full public URL of the image
 */
export const getPublicImageUrl = async (folder: string, filename: string) => {
  const { data, error } = await supabase.storage.from(folder).list();

  if (error) {
    console.error("Error checking image existence:", error.message);
    return null;
  }

  const fileExists = data.some(file => file.name === filename);

  if (fileExists) {
    return `${supabaseUrl}/storage/v1/object/public/${folder}/${filename}`;
  } else {
    return null; // Image doesn't exist
  }
};

export const listImagesInBucket = async (bucket: string): Promise<string[]> => {
  const { data, error } = await supabase.storage.from(bucket).list();
  
  if (error) {
    console.error("Error listing images:", error);
    return [];
  }

  return data?.map((file) => file.name) || [];
};