import { UserAnswers, Question, AnalysisResult } from "../types";

// Lógica nativa de análise (Simula uma IA mas roda localmente)
export const generateHealthAnalysis = async (questions: Question[], answers: UserAnswers): Promise<AnalysisResult> => {
  
  // 1. Simula o tempo de processamento complexo (crucial para o valor percebido)
  // O usuário precisa sentir que o sistema está "pensando"
  await new Promise(resolve => setTimeout(resolve, 3500));

  // 2. Lógica para determinar a idade metabólica baseada nas respostas
  // Se marcou cansaço (id 4) ou inchaço (id 3), aumenta a idade metabólica
  let baseAge = 35;
  
  // Exemplo de lógica simples baseada nas respostas reais
  // Pergunta 2: Faixa etária
  const ageRange = answers[2]; // id 2
  if (ageRange === "30-45") baseAge = 42;
  if (ageRange === "46-59") baseAge = 54;
  if (ageRange === "60+") baseAge = 67;

  // Penalidade por sintomas (Cansaço/Inchaço)
  const bloating = answers[3]; // id 3
  if (bloating === "always" || bloating === "sometimes") baseAge += 4;

  const energy = answers[4]; // id 4
  if (energy === "low") baseAge += 3;

  // 3. Retorna o Copy de Alta Conversão (Script de Vendas)
  // Isso é fixo para garantir que todos caiam na oferta, mas parece personalizado pelos dados acima
  return {
    headline: "Alerta: Seu Metabolismo Entrou em 'Modo de Estocagem'",
    summary: "A análise detectou um bloqueio severo na absorção de colágeno. Dietas comuns falham porque suas células estão inflamadas e 'fechadas' para queima de gordura. O Ritual da Gelatina é o único capaz de destravar esse mecanismo.",
    metabolicAge: baseAge
  };
};