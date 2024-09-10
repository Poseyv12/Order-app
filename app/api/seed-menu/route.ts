import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabaseClient';

const menuItems = [
    // Cakes
    { id: 1, name: 'Chocolate Cake', category: 'Cakes', price: 25.99, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D', description: 'Rich, moist chocolate cake with a smooth chocolate ganache.', quantityAvailable: 10 },
    { id: 2, name: 'Vanilla Bean Cake', category: 'Cakes', price: 23.99, image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZhbmlsbGElMjBjYWtlfGVufDB8fDB8fHww', description: 'Delicate vanilla cake with a hint of bean flavor.', quantityAvailable: 8 },
    { id: 3, name: 'Red Velvet Cake', category: 'Cakes', price: 27.99, image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkJTIwdmVsdmV0JTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D', description: 'Classic red velvet cake with cream cheese frosting.', quantityAvailable: 6 },
    { id: 4, name: 'Carrot Cake', category: 'Cakes', price: 26.99, image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fycm90JTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D', description: 'Moist carrot cake with a hint of spice and a cream cheese frosting.', quantityAvailable: 9 },
  
    // Pastries
    { id: 5, name: 'Croissant', category: 'Pastries', price: 3.99, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JvaXNzYW50fGVufDB8fDB8fHww', description: 'Buttery, flaky croissant.', quantityAvailable: 20 },
    { id: 6, name: 'Danish Pastry', category: 'Pastries', price: 4.50, image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFuaXNoJTIwcGFzdHJ5fGVufDB8fDB8fHww', description: 'Sweet, buttery danish pastry.', quantityAvailable: 15 },
    { id: 7, name: 'Eclair', category: 'Pastries', price: 4.25, image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNsYWlyfGVufDB8fDB8fHww', description: 'Choux pastry filled with cream and topped with chocolate glaze.', quantityAvailable: 12 },
    { id: 8, name: 'Cinnamon Roll', category: 'Pastries', price: 3.75, image: 'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2lubmFtb24lMjByb2xsfGVufDB8fDB8fHww', description: 'Soft, cinnamon-sugared roll.', quantityAvailable: 18 },
  
    // Breads
    { id: 9, name: 'Sourdough Bread', category: 'Breads', price: 6.99, image: 'https://images.unsplash.com/photo-1585478259715-876a6a81fc08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c291cmRvdWdoJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D', description: 'Artisanal sourdough bread with a crispy crust.', quantityAvailable: 5 },
    { id: 10, name: 'Whole Wheat Bread', category: 'Breads', price: 5.99, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hvbGUlMjB3aGVhdCUyMGJyZWFkfGVufDB8fDB8fHww', description: 'Whole wheat bread with a hearty texture.', quantityAvailable: 7 },
    { id: 11, name: 'Baguette', category: 'Breads', price: 4.50, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFndWV0dGV8ZW58MHx8MHx8fDA%3D', description: 'Long, thin French bread.', quantityAvailable: 10 },
    { id: 12, name: 'Rye Bread', category: 'Breads', price: 6.50, image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnllJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D', description: 'Hearty rye bread with a dense texture.', quantityAvailable: 8 },
  
    // Cookies
    { id: 13, name: 'Chocolate Chip Cookie', category: 'Cookies', price: 2.99, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwY2hpcCUyMGNvb2tpZXxlbnwwfHwwfHx8MA%3D%3D', description: 'Classic chocolate chip cookie with a soft center.', quantityAvailable: 30 },
    { id: 14, name: 'Oatmeal Raisin Cookie', category: 'Cookies', price: 2.75, image: 'https://images.unsplash.com/photo-1490567674331-72de84794694?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2F0bWVhbCUyMHJhaXNpbiUyMGNvb2tpZXxlbnwwfHwwfHx8MA%3D%3D', description: 'Chewy oatmeal raisin cookie with a hint of cinnamon.', quantityAvailable: 25 },
  ];

export async function POST() {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .upsert(menuItems, { onConflict: 'id' });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Menu items added successfully', data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
