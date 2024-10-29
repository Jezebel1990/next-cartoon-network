import { endpoint } from '@/utils/endpoint';

export async function getAllCharacters() {
  try {
    const response = await fetch(`${endpoint}/characters`);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return await response.json();
  } catch (error) {
    console.error("Erro surch characters:", error);
  
    return { characters: [] };
  }
}

export async function getCharacterBySlug(slug) {
  try {
    const response = await fetch(`${endpoint}/characters/${slug}`);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar personagem com slug ${slug}:`, error);
    return { character: null, character_quotes: [] };
  }
}
