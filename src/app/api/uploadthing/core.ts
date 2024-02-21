import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
 
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
  
      // If you throw, the user will not be able to upload
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
    .onUploadComplete(async ({file }) => {
 
      console.log("file url", file.url);
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
