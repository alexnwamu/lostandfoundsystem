
export async function GET() {
  const categories = await prisma?.category.findMany()
 const itemData = await prisma?.item.findMany() 
   const dataToSend = {
    items: itemData,
    categories: categories
  };

  return Response.json(dataToSend)
} 
