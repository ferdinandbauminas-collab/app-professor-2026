# Guia de Atualização Anual - App Professor

Este guia explica como atualizar os dados do aplicativo para um novo ano letivo sem precisar refazer o código do zero.

## 📂 Onde estão os dados?
Todos os dados do aplicativo ficam no arquivo:
`constants.ts` (na pasta raiz do código).

## 1. Atualizar Professores
Procure a lista `TEACHERS` dentro do arquivo.
```typescript
export const TEACHERS: Teacher[] = [
  { id: 'novo_id', name: 'Nome do Novo Professor', avatar: '...' },
  // ...
];
```
- Para adicionar um professor: Copie e cole uma linha, trocando o `id` e o `name`.
- Para remover: Apague a linha do professor que saiu.

## 2. Atualizar Disciplinas e Turmas
Procure o objeto `TEACHER_DISCIPLINES`.
Ele conecta o `id` do professor às suas turmas.
```typescript
export const TEACHER_DISCIPLINES: Record<string, Discipline[]> = {
  'novo_id_professor': [
    { 
      id: 'mat', 
      name: 'Matemática', 
      classes: ['MÓDULO II-A', 'MÓDULO II-B'], // <-- Edite as turmas aqui
      totalHours: 0 
    },
  ],
};
```
***Dica:** Os nomes das turmas aqui (ex: 'MÓDULO II-A') devem ser IGUAIS aos nomes usados na lista de alunos abaixo.*

## 3. Atualizar Alunos
Procure o objeto `STUDENTS_BY_CLASS`.
Aqui ficam as listas de presença nominais.
```typescript
const STUDENTS_BY_CLASS: Record<string, string[]> = {
  'MÓDULO II-A': [
    'ALUNO NOVO 1',
    'ALUNO NOVO 2',
    // ... cole a nova lista aqui (nomes entre aspas simples, separados por vírgula)
  ],
  'MÓDULO II-B': [
     // ...
  ]
};
```
- Basta apagar os nomes antigos e colar os novos nomes.

## 4. Colocar no Ar
Depois de salvar o arquivo `constants.ts`:
1. Abra o terminal na pasta do projeto.
2. Rode `npm run build` para gerar a nova versão.
3. Seus alunos e turmas estarão atualizados!

---
**Resumo:** O app é inteligente. Alterando apenas essas listas de texto, ele recria todos os menus, acessos e chamadas automaticamente.
