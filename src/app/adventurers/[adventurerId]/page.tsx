import AdventurerDetailsPage from './adventurer-page';

export default async function Page({ params }: { params: Promise<{ adventurerId: string }> }) {
  const { adventurerId } = await params;
  return <AdventurerDetailsPage adventurerId={adventurerId} />;
}