import AdventurerDetailsPage from './adventurer-page';

export default async function Page({ params }: { params: Promise<{ adventurerId: number }> }) {
  const { adventurerId } = await params;
  return <AdventurerDetailsPage adventurerId={adventurerId} />;
}