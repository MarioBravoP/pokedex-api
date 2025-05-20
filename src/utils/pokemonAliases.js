// Este archivo contiene un objeto que mapea nombres de Pokémon a sus nombres fijos.

const pokemonAliases = {
  "nidoran": "nidoran-m",
  "nidoran♀": "nidoran-f",
  "nidoran♂": "nidoran-m",
  "mr.mime": "mr-mime",
  "mime jr.": "mime-jr",
  "type: null": "type-null",
  "jangmo-o": "jangmo-o",
  "hakamo-o": "hakamo-o",
  "kommo-o": "kommo-o",
  "tapu koko": "tapu-koko",
  "tapu lele": "tapu-lele",
  "tapu bulu": "tapu-bulu",
  "tapu fini": "tapu-fini",
};

export const getFixedName = (name) => {
  return pokemonAliases[name] || name;
};