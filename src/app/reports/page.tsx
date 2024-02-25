'use client'
import { useEffect, useState } from 'react';
import ItemsFeed from '@/components/ItemsFeed/page'
import React from 'react'
import { format } from 'date-fns'
interface Category {
  id: string;
  name: string;
}
import { useQuery } from '@tanstack/react-query';
import SkeletonFeed from '@/components/SkeletonFeed';
import { useSession, signIn, signOut } from "next-auth/react";
const ReportsPage =  () => {

      const [items, setItems] = useState([]);
  const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState('All');

  const { data: session } = useSession();
    const fetchData = async () => {
      try {
        // Fetch data from the API endpoint
        const response = await fetch('/api/itemsandcategories');
        const data = await response.json();

        // Update state with the received data
        setItems(data.items);
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  const { isPending, error } = useQuery({
    queryKey: ["items"],
    queryFn: fetchData,
  });  
    
  if(session){ return (
    <main className="w-full text-[#615C61]  flex flex-col">
            <div className="  mx-auto w-[1174px]  flex gap-[124px]  mt-[153px]">
                <button onClick={() => setActiveCategory('All')} className={`${activeCategory ==='All' ? 'text-[#FE8116]' : '' }`}>All</button>
{categories?.map(category => <button onClick={() => setActiveCategory(category.name)} className={`${activeCategory ===category.name ? 'text-[#FE8116]' : '' }`} key={category.id}>{category.name}</button>)}
            </div>

            <div className='mx-auto mt-[157px] mb-[333px]'>
{isPending ? <SkeletonFeed/> :<ItemsFeed itemData={items} activeCategory={activeCategory}  />}
        
            </div>
    </main>
  )}

    
  return <div className="text-center mt-4 h-screen">You must be signed in</div>;
}

export default  ReportsPage
