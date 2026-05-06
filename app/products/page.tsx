import { redirect } from 'next/navigation';

export default function ProductsPage() {
  // Redirect to services section on home page - products are now presented inline
  redirect('/#services');
}