const sentences = [
  'Se Você está Usando esse Aplicativo, é um Sinal Positivo que Você Ainda não Perdeu as Esperanças',
  'Um Elogio seu a uma Outra Pessoa pode Tornar o Dia dela Melhor',
  'A Calmaria é o Melhor Remédio Contra os Problemas',
  'Nunca Troque Seis por Meia Dúzia em Decisões Importantes na Sua Vida',
  'Se uma Pessoa Pudesse Consertar o Passado, Essa Pessoa Nunca Entenderia um Pedido de Desculpas'
];

function getRandomProfileSentence() {
  const sentenceNumber = Math.floor(Math.random() * (sentences.length - 1));
  return sentences[sentenceNumber];
}

export default getRandomProfileSentence;