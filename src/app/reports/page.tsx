'use client'
import { useEffect, useState } from 'react';
import ItemsFeed from '@/components/ItemsFeed/page'
import React from 'react'
import { format } from 'date-fns'
import { loginbg } from '../../../assets'
interface Category {
  id: string;
  name: string;
}
const ReportsPage =  () => {

      const [items, setItems] = useState([]);
  const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState('All');
  useEffect(() => {
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

    fetchData();
  }, []);
    const itemData = [
  {
    itemname: "Chicken",
    tag: "001",
    dateCreated: format(Date.now(), "dd/MM/yyyy"),
    imageUrl: loginbg,
    category: "Laptops",
  },

  {
    itemname: "Iphone 13",
    tag: "001",
    dateCreated: format(Date.now(), "dd/MM/yyyy"),
    imageUrl: loginbg,

    category: "Mobile Phones",
  },

  {
    itemname: "Champion",
    tag: "001",
    imageUrl: loginbg,
    dateCreated: format(Date.now(), "dd/MM/yyyy"),
    category: "Mobile Phones",
  },
  {
    itemname: "Iphone 12",
    tag: "001",
    dateCreated: format(Date.now(), "dd/MM/yyyy"),
    imageUrl: loginbg,
    category: "Laptops",
  },

  {
    itemname: "Iphone 12",
    tag: "001",
    dateCreated: format(Date.now(), "dd/MM/yyyy"),
    imageUrl: loginbg,
    category: "Book",
  },
];

  return (
    <main className="w-full text-[#615C61]  flex flex-col">
            <div className="  mx-auto w-[1174px]  flex gap-[124px]  mt-[153px]">
                <button onClick={() => setActiveCategory('All')} className={`${activeCategory ==='All' ? 'text-[#FE8116]' : '' }`}>All</button>
{categories?.map(category => <button onClick={() => setActiveCategory(category.name)} className={`${activeCategory ===category.name ? 'text-[#FE8116]' : '' }`} key={category.id}>{category.name}</button>)}
            </div>

            <div className='mx-auto mt-[157px] mb-[333px]'>
<ItemsFeed itemData={items} activeCategory={activeCategory}  />
        
            </div>
    </main>
  )
}

export default  ReportsPage
