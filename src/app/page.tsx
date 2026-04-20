import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import GameContainer from '@/components/GameContainer';

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <GameContainer />;
}
