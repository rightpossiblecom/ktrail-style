# KTrail Style — intake contract

Shared JSON shape for Gemini `/api/analyze`, procedural fallback, choreographed demos, and `config/site.ts` seed projects.

```ts
export type StyleRecommendation = {
  name: string;
  category: 'cut' | 'color' | 'beard' | 'combo';
  why: string;
  difficulty: 'easy' | 'medium' | 'bold';
};

export type StylePreviewResult = {
  id: string;
  createdAt: string; // ISO
  clientName: string;
  city: string;
  faceShape: 'oval' | 'round' | 'square' | 'heart' | 'long' | 'diamond' | 'unknown';
  hairTexture: 'straight' | 'wavy' | 'curly' | 'coily' | 'unknown';
  requestedStyle: string;
  recommendedStyles: StyleRecommendation[]; // 3–5
  previewNotes: string;
  suggestedBarberType: string; // e.g. "Skin-fade specialist"
  confidence: number; // 0–100
  nextAction: 'book_chair' | 'send_to_barber' | 'refine_brief';
};
```

## Rules

- All three producers (Gemini, fallback, seeds) emit this shape.
- Results UI renders every field above — no orphan keys.
- Conversion modals use `nextAction` + `recommendedStyles[0]`.
- Never emit Frisor / Opencals / Berlin shop language in these objects.
