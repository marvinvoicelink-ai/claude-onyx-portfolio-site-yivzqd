import { redirect } from 'next/navigation';
import { angemeldet } from '@/lib/auth';

export default async function Start() {
  redirect((await angemeldet()) ? '/uebersicht' : '/anmelden');
}
