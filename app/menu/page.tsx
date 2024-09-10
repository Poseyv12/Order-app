

import { getMenuItems } from './actions';
import MenuPageContent from './MenuPageContent';

export default async function MenuPage() {
  const menuItems = await getMenuItems();
  return <MenuPageContent initialMenuItems={menuItems} />;
}
