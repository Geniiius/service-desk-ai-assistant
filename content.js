(function () {
  'use strict';
  if (document.getElementById('sdw-root')) {
    const panel = document.getElementById('sdw-panel');
    if (panel) panel.classList.toggle('open');
    return;
  }

  // ═══════════════════════════════════════════
  // i18n
  // ═══════════════════════════════════════════
  const I18N = {
    fr: {
      source: 'SOURCE', readPage: '📋 LIRE', placeholder: 'Collez ou sélectionnez du texte...',
      resultTitle: '✨ RÉSULTAT IA', copy: 'COPIER', copied: 'COPIÉ ✓', inject: '↩ INJECTER', injected: 'INJECTÉ ✓',
      agents: 'AGENTS IA', addAgent: '＋ AJOUTER UN AGENT',
      generating: '⏳ Génération...', noContent: '⚠ Aucun contenu détecté.',
      errorComm: '❌ Erreur. Rechargez la page.', deleteConfirm: 'Supprimer cet agent ?',
      modalTitle: '✎ Agent IA', modalName: 'NOM', modalNamePh: 'Nom',
      modalIcon: 'ICÔNE', modalPrompt: 'PROMPT', modalPromptPh: 'Instructions...',
      modalLayout: 'DISPOSITION', layoutGrid: 'Grille', layoutFull: 'Pleine largeur',
      modalCancel: 'Annuler', modalSave: 'Enregistrer',
      refineLabel: 'AFFINER', refinePh: 'Plus court, plus formel, ajouter...',
      historyTitle: 'HISTORIQUE', historyEmpty: 'Aucun historique',
      wikiTitle: 'WIKI',
      wikiGuideTitle: '📖 Guide — Connexion IA & Wiki',
      wikiGuideDesc: 'Cette section explique les <strong style="color:#c4b5fd;">deux approches</strong> pour connecter une base de connaissances à l\'assistant IA.',
      wikiGuideNoConfig: 'Aucune intégration wiki n\'est configurée pour le moment. Consultez les méthodes ci-dessous pour comprendre les options disponibles.',
      wikiM1Title: '🔎 Méthode 1 — Scraping par mot-clé',
      wikiM1Tag: 'RECHERCHE PAR MOTS-CLÉS',
      wikiM1Principle: 'Principe :',
      wikiM1Desc: 'L\'extension navigue dans les pages d\'un wiki (Confluence, SharePoint, GitHub Wiki...) et extrait le contenu par correspondance de mots-clés. Le texte trouvé est ensuite injecté dans le prompt de l\'agent IA.',
      wikiM1S1: '<strong>🔑 Mots-clés</strong><br>L\'utilisateur tape un mot-clé dans la barre de recherche',
      wikiM1S2: '<strong>🌐 Scraping</strong><br>L\'extension parcourt les pages du wiki et cherche les correspondances exactes',
      wikiM1S3: '<strong>📋 Extraction</strong><br>Le contenu pertinent est extrait et affiché ou envoyé à l\'IA comme contexte',
      wikiComingSoon: 'Coming Soon',
      wikiComingSoonDesc: 'Cette fonctionnalité sera disponible dans une prochaine version.',
      wikiComingSoonReq: 'Nécessite : accès au wiki + authentification + URL de base configurée',
      wikiM2Title: '🧠 Méthode 2 — Agent RAG',
      wikiM2Tag: 'RETRIEVAL-AUGMENTED GENERATION',
      wikiM2Principle: 'Principe :',
      wikiM2Desc: 'Les documents de la base de connaissances sont pré-indexés dans une base vectorielle. Quand l\'utilisateur pose une question, une recherche sémantique trouve les passages les plus pertinents, qui sont injectés comme contexte pour l\'IA.',
      wikiM2FlowTitle: 'Flow visuel — étape par étape :',
      wikiM2S1: '<strong>📄 Documents sources</strong><br>Wiki, KB, procédures, FAQ sont découpés en petits morceaux (chunks de ~500 tokens)',
      wikiM2S2: '<strong>🔢 Vectorisation (Embeddings)</strong><br>Chaque chunk est converti en vecteur numérique via un modèle d\'embedding et stocké dans une base vectorielle (Pinecone, Weaviate, ChromaDB...)',
      wikiM2S3: '<strong>❓ Question utilisateur</strong><br>L\'utilisateur pose sa question → elle est aussi convertie en vecteur',
      wikiM2S4: '<strong>🔍 Recherche sémantique</strong><br>On compare le vecteur de la question aux vecteurs des chunks → les plus similaires sont récupérés (top 3-5)',
      wikiM2S5: '<strong>🧩 Injection dans le prompt</strong><br>Les chunks pertinents sont ajoutés comme contexte',
      wikiM2S6: '<strong>🤖 Réponse augmentée</strong><br>L\'IA génère une réponse basée sur vos documents réels — réponse fiable, sourcée, sans hallucination',
      wikiCompTitle: '📊 Scraping vs RAG — Comparatif',
      wikiCompCriteria: 'Critère', wikiCompSetup: 'Mise en place', wikiCompSearch: 'Type de recherche', wikiCompInfra: 'Infrastructure', wikiCompPrecision: 'Précision', wikiCompCost: 'Coût', wikiCompIdeal: 'Idéal pour',
      wikiCompSetupS: '⚡ Simple', wikiCompSetupR: '🔧 Complexe',
      wikiCompSearchS: 'Mots-clés exacts', wikiCompSearchR: 'Sémantique',
      wikiCompInfraS: 'Aucune', wikiCompInfraR: 'Serveur + BDD',
      wikiCompCostS: 'Gratuit', wikiCompCostR: 'Variable',
      wikiCompIdealS: 'Recherche rapide', wikiCompIdealR: 'KB complète',
      wikiProConTitle: '⚖️ RAG — Avantages & Limites',
      wikiProLabel: '✓ AVANTAGES', wikiConLabel: '⚠ LIMITES',
      wikiPro1: 'Comprend le sens des questions, pas juste les mots-clés',
      wikiPro2: 'Accès à toute la base de connaissances (wiki, docs, procédures)',
      wikiPro3: 'Réponses sourcées — on peut tracer l\'origine',
      wikiPro4: 'Réduit fortement les hallucinations',
      wikiPro5: 'Idéal pour le Service Desk avec documentation volumineuse',
      wikiCon1: 'Nécessite un backend (serveur + base vectorielle)',
      wikiCon2: 'Configuration initiale plus complexe',
      wikiCon3: 'Coût potentiel (hébergement, API embeddings)',
      wikiCon4: 'Latence plus élevée (recherche + génération)',
      wikiCon5: 'Qualité dépend directement des documents indexés',
      wikiStatusTitle: '📌 Statut actuel',
      wikiStatusDesc: 'L\'extension utilise actuellement l\'approche par <strong style="color:#c4b5fd;">injection de contexte de page</strong> (lecture du contenu visible).',
      wikiStatusMethods: '🔎 <strong>Scraping</strong> → Coming soon &nbsp;|&nbsp; 🧠 <strong>RAG</strong> → Nécessite un backend dédié',
      wikiStatusHelp: 'Pour configurer une intégration wiki, contactez l\'administrateur ou consultez la documentation du projet sur GitHub.',
      globalPh: 'Instruction globale (appliquée à tous les agents)...',
      globalLabel: 'INSTRUCTION GLOBALE',
      tokensLabel: 'tokens', clearHistory: 'Vider',
      // Onboarding
      obWelcome: 'Bienvenue dans Service Desk AI', obDesc: 'Assistant IA pour le Service Desk',
      obStep1: '1. Entrez votre clé API Groq', obStep1d: 'Créez un compte gratuit sur console.groq.com',
      obStep2: '2. Choisissez votre langue', obStep3: '3. C\'est parti !',
      obStart: '🚀 COMMENCER', obSkip: 'Configurer plus tard',
      // Default buttons
      btn1: 'Note client', btn1d: 'Clôture pro', btn1p: "Tu es un assistant professionnel. Rédige une note client finale.\nFormat: Bonjour, [explication], Cordialement.",
      btn2: 'Structurer', btn2d: 'Organisation', btn2p: "Organise en structure claire : Contexte, Problème, Analyse, Actions, Résultat.",
      btn3: 'Titre', btn3d: 'Titre court', btn3p: "Génère un titre court résumant le contenu.",
      btn4: 'Corriger', btn4d: 'Orthographe', btn4p: "Corrige orthographe et grammaire. Garde le même sens.",
      btn5: 'Reformuler', btn5d: 'Clarifier', btn5p: "Reformule pour améliorer la clarté.",
      btn6: 'Amical', btn6d: 'Ton souple', btn6p: "Réécris avec un ton amical.",
      btn7: 'Pro', btn7d: 'Formel', btn7p: "Réécris en style formel et professionnel.",
      btn8: 'Points clés', btn8d: 'Synthèse', btn8p: "Résume en 5 à 7 points clés."
    },
    en: {
      source: 'SOURCE', readPage: '📋 READ', placeholder: 'Paste or select text...',
      resultTitle: '✨ AI RESULT', copy: 'COPY', copied: 'COPIED ✓', inject: '↩ INJECT', injected: 'INJECTED ✓',
      agents: 'AI AGENTS', addAgent: '＋ ADD AGENT',
      generating: '⏳ Generating...', noContent: '⚠ No content detected.',
      errorComm: '❌ Error. Reload the page.', deleteConfirm: 'Delete this agent?',
      modalTitle: '✎ AI Agent', modalName: 'NAME', modalNamePh: 'Name',
      modalIcon: 'ICON', modalPrompt: 'PROMPT', modalPromptPh: 'Instructions...',
      modalLayout: 'LAYOUT', layoutGrid: 'Grid', layoutFull: 'Full width',
      modalCancel: 'Cancel', modalSave: 'Save',
      refineLabel: 'REFINE', refinePh: 'Shorter, more formal, add...',
      historyTitle: 'HISTORY', historyEmpty: 'No history yet',
      wikiTitle: 'WIKI',
      wikiGuideTitle: '📖 Guide — AI & Wiki Connection',
      wikiGuideDesc: 'This section explains the <strong style="color:#c4b5fd;">two approaches</strong> for connecting a knowledge base to the AI assistant.',
      wikiGuideNoConfig: 'No wiki integration is configured yet. Review the methods below to understand the available options.',
      wikiM1Title: '🔎 Method 1 — Keyword Scraping',
      wikiM1Tag: 'KEYWORD SEARCH',
      wikiM1Principle: 'How it works:',
      wikiM1Desc: 'The extension browses wiki pages (Confluence, SharePoint, GitHub Wiki...) and extracts content by keyword matching. The found text is then injected into the AI agent\'s prompt.',
      wikiM1S1: '<strong>🔑 Keywords</strong><br>The user types a keyword in the search bar',
      wikiM1S2: '<strong>🌐 Scraping</strong><br>The extension browses wiki pages and looks for exact matches',
      wikiM1S3: '<strong>📋 Extraction</strong><br>Relevant content is extracted and displayed or sent to the AI as context',
      wikiComingSoon: 'Coming Soon',
      wikiComingSoonDesc: 'This feature will be available in a future version.',
      wikiComingSoonReq: 'Requires: wiki access + authentication + configured base URL',
      wikiM2Title: '🧠 Method 2 — RAG Agent',
      wikiM2Tag: 'RETRIEVAL-AUGMENTED GENERATION',
      wikiM2Principle: 'How it works:',
      wikiM2Desc: 'Knowledge base documents are pre-indexed in a vector database. When the user asks a question, a semantic search finds the most relevant passages, which are injected as context for the AI.',
      wikiM2FlowTitle: 'Visual flow — step by step:',
      wikiM2S1: '<strong>📄 Source documents</strong><br>Wiki, KB, procedures, FAQs are split into small pieces (chunks of ~500 tokens)',
      wikiM2S2: '<strong>🔢 Vectorization (Embeddings)</strong><br>Each chunk is converted into a numerical vector via an embedding model and stored in a vector database (Pinecone, Weaviate, ChromaDB...)',
      wikiM2S3: '<strong>❓ User question</strong><br>The user asks a question → it is also converted into a vector',
      wikiM2S4: '<strong>🔍 Semantic search</strong><br>The question vector is compared to chunk vectors → the most similar ones are retrieved (top 3-5)',
      wikiM2S5: '<strong>🧩 Prompt injection</strong><br>Relevant chunks are added as context',
      wikiM2S6: '<strong>🤖 Augmented response</strong><br>The AI generates a response based on your real documents — reliable, sourced, hallucination-free',
      wikiCompTitle: '📊 Scraping vs RAG — Comparison',
      wikiCompCriteria: 'Criteria', wikiCompSetup: 'Setup', wikiCompSearch: 'Search type', wikiCompInfra: 'Infrastructure', wikiCompPrecision: 'Precision', wikiCompCost: 'Cost', wikiCompIdeal: 'Best for',
      wikiCompSetupS: '⚡ Simple', wikiCompSetupR: '🔧 Complex',
      wikiCompSearchS: 'Exact keywords', wikiCompSearchR: 'Semantic',
      wikiCompInfraS: 'None', wikiCompInfraR: 'Server + DB',
      wikiCompCostS: 'Free', wikiCompCostR: 'Variable',
      wikiCompIdealS: 'Quick search', wikiCompIdealR: 'Full KB',
      wikiProConTitle: '⚖️ RAG — Pros & Limits',
      wikiProLabel: '✓ ADVANTAGES', wikiConLabel: '⚠ LIMITS',
      wikiPro1: 'Understands the meaning of questions, not just keywords',
      wikiPro2: 'Access to the entire knowledge base (wiki, docs, procedures)',
      wikiPro3: 'Sourced responses — origin can be traced',
      wikiPro4: 'Greatly reduces hallucinations',
      wikiPro5: 'Ideal for Service Desk with extensive documentation',
      wikiCon1: 'Requires a backend (server + vector database)',
      wikiCon2: 'More complex initial setup',
      wikiCon3: 'Potential cost (hosting, embedding APIs)',
      wikiCon4: 'Higher latency (search + generation)',
      wikiCon5: 'Quality depends directly on indexed documents',
      wikiStatusTitle: '📌 Current status',
      wikiStatusDesc: 'The extension currently uses the <strong style="color:#c4b5fd;">page context injection</strong> approach (reading visible content).',
      wikiStatusMethods: '🔎 <strong>Scraping</strong> → Coming soon &nbsp;|&nbsp; 🧠 <strong>RAG</strong> → Requires a dedicated backend',
      wikiStatusHelp: 'To configure a wiki integration, contact the administrator or check the project documentation on GitHub.',
      globalPh: 'Global instruction (applied to all agents)...',
      globalLabel: 'GLOBAL INSTRUCTION',
      tokensLabel: 'tokens', clearHistory: 'Clear',
      obWelcome: 'Welcome to Service Desk AI', obDesc: 'AI assistant for Service Desk',
      obStep1: '1. Enter your Groq API key', obStep1d: 'Create a free account at console.groq.com',
      obStep2: '2. Choose your language', obStep3: '3. Let\'s go!',
      obStart: '🚀 START', obSkip: 'Configure later',
      btn1: 'Client note', btn1d: 'Pro closing', btn1p: "You are a professional assistant. Write a final client note.\nFormat: Hello, [explanation], Best regards.",
      btn2: 'Structure', btn2d: 'Organize', btn2p: "Organize into: Context, Problem, Analysis, Actions, Result.",
      btn3: 'Title', btn3d: 'Short title', btn3p: "Generate a short title summarizing the content.",
      btn4: 'Correct', btn4d: 'Spelling', btn4p: "Fix spelling and grammar. Keep the same meaning.",
      btn5: 'Rephrase', btn5d: 'Clarify', btn5p: "Rephrase to improve clarity.",
      btn6: 'Friendly', btn6d: 'Soft tone', btn6p: "Rewrite with a friendly tone.",
      btn7: 'Formal', btn7d: 'Professional', btn7p: "Rewrite in a formal, professional style.",
      btn8: 'Key points', btn8d: 'Summary', btn8p: "Summarize in 5 to 7 key points."
    },
    es: {
      source: 'FUENTE', readPage: '📋 LEER', placeholder: 'Pegue o seleccione texto...',
      resultTitle: '✨ RESULTADO IA', copy: 'COPIAR', copied: 'COPIADO ✓', inject: '↩ INYECTAR', injected: 'INYECTADO ✓',
      agents: 'AGENTES IA', addAgent: '＋ AÑADIR AGENTE',
      generating: '⏳ Generando...', noContent: '⚠ Sin contenido detectado.',
      errorComm: '❌ Error. Recargue la página.', deleteConfirm: '¿Eliminar este agente?',
      modalTitle: '✎ Agente IA', modalName: 'NOMBRE', modalNamePh: 'Nombre',
      modalIcon: 'ICONO', modalPrompt: 'PROMPT', modalPromptPh: 'Instrucciones...',
      modalLayout: 'DISPOSICIÓN', layoutGrid: 'Cuadrícula', layoutFull: 'Ancho completo',
      modalCancel: 'Cancelar', modalSave: 'Guardar',
      refineLabel: 'AFINAR', refinePh: 'Más corto, más formal, añadir...',
      historyTitle: 'HISTORIAL', historyEmpty: 'Sin historial',
      wikiTitle: 'WIKI',
      wikiGuideTitle: '📖 Guía — Conexión IA & Wiki',
      wikiGuideDesc: 'Esta sección explica los <strong style="color:#c4b5fd;">dos enfoques</strong> para conectar una base de conocimiento al asistente IA.',
      wikiGuideNoConfig: 'No hay integración wiki configurada por el momento. Consulte los métodos a continuación para entender las opciones disponibles.',
      wikiM1Title: '🔎 Método 1 — Scraping por palabra clave',
      wikiM1Tag: 'BÚSQUEDA POR PALABRAS CLAVE',
      wikiM1Principle: 'Principio:',
      wikiM1Desc: 'La extensión navega por las páginas de un wiki (Confluence, SharePoint, GitHub Wiki...) y extrae contenido por coincidencia de palabras clave. El texto encontrado se inyecta en el prompt del agente IA.',
      wikiM1S1: '<strong>🔑 Palabras clave</strong><br>El usuario escribe una palabra clave en la barra de búsqueda',
      wikiM1S2: '<strong>🌐 Scraping</strong><br>La extensión recorre las páginas del wiki y busca coincidencias exactas',
      wikiM1S3: '<strong>📋 Extracción</strong><br>El contenido relevante se extrae y muestra o envía a la IA como contexto',
      wikiComingSoon: 'Coming Soon',
      wikiComingSoonDesc: 'Esta funcionalidad estará disponible en una próxima versión.',
      wikiComingSoonReq: 'Requiere: acceso al wiki + autenticación + URL base configurada',
      wikiM2Title: '🧠 Método 2 — Agente RAG',
      wikiM2Tag: 'RETRIEVAL-AUGMENTED GENERATION',
      wikiM2Principle: 'Principio:',
      wikiM2Desc: 'Los documentos de la base de conocimiento se pre-indexan en una base vectorial. Cuando el usuario hace una pregunta, una búsqueda semántica encuentra los pasajes más relevantes, que se inyectan como contexto para la IA.',
      wikiM2FlowTitle: 'Flujo visual — paso a paso:',
      wikiM2S1: '<strong>📄 Documentos fuente</strong><br>Wiki, KB, procedimientos, FAQ se dividen en pequeños fragmentos (chunks de ~500 tokens)',
      wikiM2S2: '<strong>🔢 Vectorización (Embeddings)</strong><br>Cada chunk se convierte en un vector numérico mediante un modelo de embedding y se almacena en una base vectorial (Pinecone, Weaviate, ChromaDB...)',
      wikiM2S3: '<strong>❓ Pregunta del usuario</strong><br>El usuario hace su pregunta → también se convierte en un vector',
      wikiM2S4: '<strong>🔍 Búsqueda semántica</strong><br>Se compara el vector de la pregunta con los vectores de los chunks → se recuperan los más similares (top 3-5)',
      wikiM2S5: '<strong>🧩 Inyección en el prompt</strong><br>Los chunks relevantes se añaden como contexto',
      wikiM2S6: '<strong>🤖 Respuesta aumentada</strong><br>La IA genera una respuesta basada en sus documentos reales — fiable, con fuentes, sin alucinación',
      wikiCompTitle: '📊 Scraping vs RAG — Comparativa',
      wikiCompCriteria: 'Criterio', wikiCompSetup: 'Implementación', wikiCompSearch: 'Tipo de búsqueda', wikiCompInfra: 'Infraestructura', wikiCompPrecision: 'Precisión', wikiCompCost: 'Costo', wikiCompIdeal: 'Ideal para',
      wikiCompSetupS: '⚡ Simple', wikiCompSetupR: '🔧 Complejo',
      wikiCompSearchS: 'Palabras exactas', wikiCompSearchR: 'Semántica',
      wikiCompInfraS: 'Ninguna', wikiCompInfraR: 'Servidor + BDD',
      wikiCompCostS: 'Gratis', wikiCompCostR: 'Variable',
      wikiCompIdealS: 'Búsqueda rápida', wikiCompIdealR: 'KB completa',
      wikiProConTitle: '⚖️ RAG — Ventajas y Límites',
      wikiProLabel: '✓ VENTAJAS', wikiConLabel: '⚠ LÍMITES',
      wikiPro1: 'Comprende el sentido de las preguntas, no solo las palabras',
      wikiPro2: 'Acceso a toda la base de conocimiento (wiki, docs, procedimientos)',
      wikiPro3: 'Respuestas con fuentes — se puede rastrear el origen',
      wikiPro4: 'Reduce significativamente las alucinaciones',
      wikiPro5: 'Ideal para Service Desk con documentación extensa',
      wikiCon1: 'Requiere un backend (servidor + base vectorial)',
      wikiCon2: 'Configuración inicial más compleja',
      wikiCon3: 'Costo potencial (alojamiento, APIs de embedding)',
      wikiCon4: 'Latencia más alta (búsqueda + generación)',
      wikiCon5: 'La calidad depende directamente de los documentos indexados',
      wikiStatusTitle: '📌 Estado actual',
      wikiStatusDesc: 'La extensión utiliza actualmente el enfoque de <strong style="color:#c4b5fd;">inyección de contexto de página</strong> (lectura del contenido visible).',
      wikiStatusMethods: '🔎 <strong>Scraping</strong> → Coming soon &nbsp;|&nbsp; 🧠 <strong>RAG</strong> → Requiere un backend dedicado',
      wikiStatusHelp: 'Para configurar una integración wiki, contacte al administrador o consulte la documentación del proyecto en GitHub.',
      globalPh: 'Instrucción global (aplicada a todos los agentes)...',
      globalLabel: 'INSTRUCCIÓN GLOBAL',
      tokensLabel: 'tokens', clearHistory: 'Borrar',
      obWelcome: 'Bienvenido a Service Desk AI', obDesc: 'Asistente IA para Service Desk',
      obStep1: '1. Ingrese su clave API Groq', obStep1d: 'Cree una cuenta gratis en console.groq.com',
      obStep2: '2. Elija su idioma', obStep3: '3. ¡Vamos!',
      obStart: '🚀 EMPEZAR', obSkip: 'Configurar después',
      btn1: 'Nota cliente', btn1d: 'Cierre pro', btn1p: "Eres un asistente profesional. Redacta una nota final.\nFormato: Hola, [explicación], Atentamente.",
      btn2: 'Estructurar', btn2d: 'Organizar', btn2p: "Organiza en: Contexto, Problema, Análisis, Acciones, Resultado.",
      btn3: 'Título', btn3d: 'Título corto', btn3p: "Genera un título corto que resuma el contenido.",
      btn4: 'Corregir', btn4d: 'Ortografía', btn4p: "Corrige ortografía y gramática. Mantén el mismo sentido.",
      btn5: 'Reformular', btn5d: 'Clarificar', btn5p: "Reformula para mejorar la claridad.",
      btn6: 'Amigable', btn6d: 'Tono suave', btn6p: "Reescribe con un tono amigable.",
      btn7: 'Formal', btn7d: 'Profesional', btn7p: "Reescribe en estilo formal y profesional.",
      btn8: 'Puntos clave', btn8d: 'Síntesis', btn8p: "Resume en 5 a 7 puntos clave."
    }
  };
  function t(key) { return (I18N[state.lang] || I18N.fr)[key] || key; }
  function getDefaultButtons(lang) {
    const s = I18N[lang] || I18N.fr;
    return [
      { id: 1, name: s.btn1, icon: '✅', desc: s.btn1d, layout: 'full', prompt: s.btn1p },
      { id: 2, name: s.btn2, icon: '🧾', desc: s.btn2d, layout: 'full', prompt: s.btn2p },
      { id: 3, name: s.btn3, icon: '✏️', desc: s.btn3d, layout: 'grid', prompt: s.btn3p },
      { id: 4, name: s.btn4, icon: '🔍', desc: s.btn4d, layout: 'grid', prompt: s.btn4p },
      { id: 5, name: s.btn5, icon: '🔄', desc: s.btn5d, layout: 'grid', prompt: s.btn5p },
      { id: 6, name: s.btn6, icon: '😊', desc: s.btn6d, layout: 'grid', prompt: s.btn6p },
      { id: 7, name: s.btn7, icon: '🏢', desc: s.btn7d, layout: 'grid', prompt: s.btn7p },
      { id: 8, name: s.btn8, icon: '💡', desc: s.btn8d, layout: 'grid', prompt: s.btn8p }
    ];
  }

  // ═══════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════
  const STORAGE_KEY = 'sdw_quantum_v13';
  let state = { apiKey: '', model: 'llama-3.3-70b-versatile', theme: 'midnight', lang: 'fr',
    globalInstruction: '', buttons: null, onboarded: false, panelPos: { right:20, bottom:105 }, fabPos: { right:25, bottom:25 },
    history: [], tokenUsage: { total: 0, month: new Date().getMonth() } };

  // Conversation context for iteration
  let currentConversation = [];
  let currentPrompt = '';
  let lastSourceField = null; // for injection

  async function loadState() {
    try {
      const d = await chrome.storage.local.get([STORAGE_KEY]);
      if (d[STORAGE_KEY]) state = { ...state, ...d[STORAGE_KEY] };
      // Migration from v12
      if (!d[STORAGE_KEY]) {
        const old = await chrome.storage.local.get(['sdw_quantum_v12']);
        if (old.sdw_quantum_v12) {
          state = { ...state, ...old.sdw_quantum_v12, onboarded: true };
        }
      }
      if (!state.buttons || state.buttons.length === 0) state.buttons = getDefaultButtons(state.lang);
      // Reset monthly tokens
      const m = new Date().getMonth();
      if (state.tokenUsage.month !== m) { state.tokenUsage = { total: 0, month: m }; }
      if (!state.history) state.history = [];
    } catch (e) { state.buttons = getDefaultButtons(state.lang); }
  }
  async function saveState() {
    try { await chrome.storage.local.set({ [STORAGE_KEY]: state }); } catch (e) { console.warn('[SDW] Failed to save state:', e.message); }
  }
  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  // ═══════════════════════════════════════════
  // STYLES
  // ═══════════════════════════════════════════
  const root = document.createElement('div');
  root.id = 'sdw-root';
  const style = document.createElement('style');
  style.textContent = `
    :root { --bg-glass: rgba(13,17,28,0.98); --accent: #a855f7; --text-main: #fff; --text-dim: #94a3b8; --border: rgba(255,255,255,0.1); --input-bg: rgba(22,28,45,0.6); --holo-blue: #89d4ff; --holo-glow: rgba(137,212,255,0.6); }
    #sdw-panel.theme-obsidian { --bg-glass: rgba(5,5,5,0.98); --accent: #6366f1; }
    #sdw-panel.theme-aurora { --bg-glass: rgba(2,10,9,0.98); --accent: #10b981; }
    #sdw-panel.theme-ivory { --bg-glass: #f8fafc; --accent: #8b5cf6; --text-main: #1e293b; --text-dim: #64748b; --border: rgba(0,0,0,0.1); --input-bg: #fff; }

    #sdw-panel { position:fixed; bottom:105px; right:20px; width:420px; max-height:calc(100vh - 130px); min-height:320px;
      background:var(--bg-glass); backdrop-filter:blur(50px); border:1px solid var(--border); border-radius:34px;
      z-index:2147483647; color:var(--text-main); display:none; flex-direction:column;
      box-shadow:0 40px 100px rgba(0,0,0,0.9); font-family:'Segoe UI',system-ui,sans-serif; overflow:hidden; }
    #sdw-panel.open { display:flex; animation:panelAppear .4s cubic-bezier(.16,1,.3,1); }
    @keyframes panelAppear { from{opacity:0;transform:translateY(30px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }

    .sdw-header { padding:16px 20px; display:flex; align-items:center; gap:12px; border-bottom:1px solid var(--border); flex-shrink:0; cursor:grab; user-select:none; }
    .sdw-header:active { cursor:grabbing; }
    .sdw-robot-box { width:60px; height:60px; flex-shrink:0; position:relative; }
    .sdw-title { font-size:22px; font-weight:900; letter-spacing:-.5px; }
    .sdw-status { font-size:10px; color:var(--text-dim); font-weight:700; margin-top:2px; display:flex; align-items:center; gap:6px; }
    .sdw-body { padding:12px 15px; display:flex; flex-direction:column; gap:10px; overflow-y:auto; overflow-x:hidden; flex:1; min-height:0; }
    .sdw-body::-webkit-scrollbar { width:5px; } .sdw-body::-webkit-scrollbar-thumb { background:rgba(255,255,255,.15); border-radius:10px; }
    .sdw-label { font-size:9px; font-weight:900; color:var(--text-dim); text-transform:uppercase; letter-spacing:1.5px; }
    .sdw-input-card { background:var(--input-bg); border:1px solid var(--border); border-radius:16px; padding:10px; }
    .sdw-textarea { width:100%; background:transparent; border:none; color:var(--text-main); font-size:13px; height:65px; resize:vertical; outline:none; font-family:inherit; box-sizing:border-box; }

    /* Result */
    #sdw-result-container { display:none; border:2px solid var(--accent); background:rgba(17,24,39,.95); backdrop-filter:blur(10px);
      border-radius:18px; padding:12px; animation:slideUp .3s ease-out;
      box-shadow:0 0 20px rgba(168,85,247,.15); flex-shrink:0; }
    #sdw-result-container .sdw-textarea { height:140px; color:#e2e8f0; font-size:13px; line-height:1.6;
      background:rgba(0,0,0,.3); border-radius:10px; padding:8px; border:1px solid rgba(255,255,255,.06); }
    .result-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; gap:6px; flex-wrap:wrap; }
    .btn-copy,.btn-inject { padding:5px 10px; border-radius:8px; font-size:9px; font-weight:900; border:none; cursor:pointer; transition:.2s; color:#fff; }
    .btn-copy { background:#10b981; } .btn-copy:hover { background:#059669; }
    .btn-inject { background:#6366f1; } .btn-inject:hover { background:#4f46e5; }
    .sdw-token-badge { font-size:8px; color:var(--text-dim); font-weight:700; }

    /* Refine input */
    .sdw-refine-row { display:flex; gap:6px; margin-top:8px; }
    .sdw-refine-input { flex:1; background:rgba(0,0,0,.3); border:1px solid var(--border); border-radius:10px; padding:8px; color:#fff; font-size:11px; outline:none; font-family:inherit; }
    .sdw-refine-btn { background:var(--accent); color:#fff; border:none; border-radius:10px; padding:8px 12px; font-size:10px; font-weight:800; cursor:pointer; }

    /* Tabs */
    .sdw-tabs { display:flex; gap:0; border-bottom:1px solid var(--border); flex-shrink:0; }
    .sdw-tab { flex:1; padding:10px; text-align:center; font-size:10px; font-weight:900; color:var(--text-dim); cursor:pointer; border-bottom:2px solid transparent; transition:.2s; text-transform:uppercase; letter-spacing:1px; }
    .sdw-tab.active { color:var(--accent); border-bottom-color:var(--accent); }
    .sdw-tab-content { display:none; } .sdw-tab-content.active { display:flex; flex-direction:column; gap:10px; }

    /* History */
    .sdw-hist-item { background:var(--input-bg); border:1px solid var(--border); border-radius:12px; padding:10px; cursor:pointer; transition:.2s; }
    .sdw-hist-item:hover { border-color:var(--accent); }
    .sdw-hist-meta { font-size:8px; color:var(--text-dim); display:flex; justify-content:space-between; margin-bottom:4px; }
    .sdw-hist-text { font-size:11px; color:var(--text-main); max-height:40px; overflow:hidden; text-overflow:ellipsis; }

    /* Wiki */
    .sdw-wiki-card { background:var(--input-bg); border:1px solid var(--border); border-radius:14px; padding:14px; margin-bottom:10px; }
    .sdw-wiki-card h4 { font-size:11px; font-weight:900; color:var(--accent); letter-spacing:1.5px; text-transform:uppercase; margin-bottom:8px; }
    .sdw-wiki-card p, .sdw-wiki-card li { font-size:10px; color:var(--text-dim); line-height:1.7; }
    .sdw-wiki-card ul, .sdw-wiki-card ol { padding-left:14px; margin:4px 0; }
    .sdw-wiki-tag { display:inline-block; font-size:8px; font-weight:800; padding:2px 8px; border-radius:6px; margin-right:4px; margin-bottom:3px; }
    .sdw-wiki-tag.pro { background:rgba(74,222,128,.12); color:#4ade80; }
    .sdw-wiki-tag.con { background:rgba(251,146,60,.12); color:#fb923c; }
    .sdw-wiki-tag.method { background:rgba(167,139,250,.12); color:#a78bfa; }
    .sdw-wiki-coming { text-align:center; padding:20px; opacity:.7; }
    .sdw-wiki-coming .icon { font-size:32px; margin-bottom:8px; }
    .sdw-wiki-coming .label { font-size:11px; font-weight:900; letter-spacing:3px; text-transform:uppercase; color:var(--accent); }
    .sdw-wiki-coming .sub { font-size:9px; color:var(--text-dim); margin-top:4px; }
    .sdw-wiki-vs { display:flex; align-items:center; gap:8px; margin:10px 0; }
    .sdw-wiki-vs-line { flex:1; height:1px; background:var(--border); }
    .sdw-wiki-vs-text { font-size:9px; font-weight:900; color:var(--accent); letter-spacing:2px; }
    .sdw-wiki-flow { display:flex; flex-direction:column; gap:6px; margin:8px 0; }
    .sdw-wiki-step { display:flex; align-items:flex-start; gap:8px; }
    .sdw-wiki-step-num { min-width:20px; height:20px; border-radius:50%; background:var(--accent); color:#fff; font-size:9px; font-weight:900; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .sdw-wiki-step-text { font-size:10px; color:var(--text-main); line-height:1.5; }
    .sdw-wiki-arrow { text-align:center; color:var(--text-dim); font-size:12px; }

    /* Grid + Buttons */
    .sdw-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; overflow:hidden; }
    .sdw-btn { background:rgba(255,255,255,.05); border:1px solid var(--border); border-radius:16px; padding:12px; display:flex; align-items:center; gap:10px; cursor:pointer; transition:.2s; position:relative; overflow:hidden; }
    .sdw-btn:hover { border-color:var(--accent); background:rgba(255,255,255,.08); transform:translateY(-2px); }
    .sdw-btn.sdw-loading { opacity:.6; pointer-events:none; }
    .sdw-btn-primary { grid-column:span 2; background:linear-gradient(135deg,var(--accent),#6366f1); border:none; }

    /* Hologram Robot in Header */
    .sdw-holo-robot { filter:drop-shadow(0 0 10px rgba(137,212,255,0.7)); animation:holoFloat 4s ease-in-out infinite; transform-origin:center; }
    .sdw-holo-scanline { position:absolute; inset:0; border-radius:12px; background:linear-gradient(transparent 50%,rgba(137,212,255,.2) 50%); background-size:100% 4px; pointer-events:none; animation:scanline 3s linear infinite; mix-blend-mode:overlay; }
    
    /* Star Dust Particles */
    .sdw-star-dust { position:fixed; pointer-events:none; z-index:2147483648; width:4px; height:4px; background:#fff; border-radius:50%; box-shadow:0 0 8px #a855f7, 0 0 12px #89d4ff; animation:starDustFade .8s forwards ease-out; }
    @keyframes starDustFade { 0% { opacity:1; transform:scale(1) translate(0, 0); } 100% { opacity:0; transform:scale(0) translate(var(--dx), var(--dy)); } }

    /* FAB */
    #sdw-fab { position:fixed; bottom:25px; right:25px; width:64px; height:64px; border-radius:20px;
      background:rgba(10,15,25,.8); backdrop-filter:blur(12px); border:1px solid rgba(137,212,255,0.4);
      cursor:grab; z-index:2147483646; display:flex; align-items:center; justify-content:center;
      box-shadow:0 0 15px rgba(137,212,255,0.3),inset 0 0 10px rgba(137,212,255,0.2); transition:transform .2s, box-shadow .2s; user-select:none; }
    #sdw-fab:active { cursor:grabbing; }
    #sdw-fab:hover { transform:scale(1.05); box-shadow:0 0 25px rgba(137,212,255,0.6); }
    .holo-scanner { position:absolute; inset:0; border-radius:20px; background:linear-gradient(transparent 50%,rgba(137,212,255,.1) 50%); background-size:100% 4px; pointer-events:none; animation:scanline 3s linear infinite; }
    @keyframes scanline { from{background-position:0 0} to{background-position:0 100%} }
    .robot-holo-svg { width:44px; height:44px; filter:drop-shadow(0 0 5px rgba(137,212,255,0.8)); animation:holoFloat 4s ease-in-out infinite; }
    @keyframes holoFloat { 0%,100%{transform:translateY(0) scale(1);opacity:.8} 50%{transform:translateY(-3px) scale(1.02);opacity:1} }

    /* Settings */
    #sdw-settings-drawer { position:absolute; top:0; left:0; right:0; background:#1e293b; border-radius:24px 24px 16px 16px;
      padding:12px; z-index:1000; display:flex; flex-direction:column; gap:6px;
      transform:translateY(-110%); transition:.4s cubic-bezier(.16,1,.3,1); box-shadow:0 10px 40px rgba(0,0,0,.5); }
    #sdw-settings-drawer.open { transform:translateY(0); }
    .sdw-cfg-row { display:flex; align-items:center; gap:6px; }
    .sdw-cfg-input { flex:1; background:rgba(0,0,0,.3); border:1px solid #334155; border-radius:8px; padding:7px; color:#fff; outline:none; font-size:11px; font-family:inherit; }
    .sdw-cfg-select { background:#0f172a; color:#fff; border:1px solid #334155; border-radius:8px; padding:5px; font-size:10px; outline:none; }
    .sdw-cfg-btn { padding:7px 9px; border-radius:8px; font-weight:800; font-size:10px; border:none; cursor:pointer; color:#fff; }
    .sdw-cfg-textarea { width:100%; background:rgba(0,0,0,.3); border:1px solid #334155; border-radius:8px; padding:7px; color:#fff; outline:none; font-size:10px; font-family:inherit; height:45px; resize:none; box-sizing:border-box; }

    .dot { width:14px; height:14px; border-radius:50%; cursor:pointer; border:2px solid transparent; transition:.2s; }
    .dot.active { border-color:#fff; transform:scale(1.3); }
    @keyframes brainPulse { 0%,100%{fill:#a855f7;opacity:.5} 50%{fill:#89d4ff;opacity:1} }
    @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

    /* Modal */
    #sdw-modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.7); backdrop-filter:blur(8px); z-index:2147483648; align-items:center; justify-content:center; }
    .sdw-modal { background:#0f172a; border:1px solid rgba(255,255,255,.15); border-radius:24px; padding:20px; width:380px;
      display:flex; flex-direction:column; gap:10px; box-shadow:0 30px 80px rgba(0,0,0,.8); max-height:90vh; overflow-y:auto; }
    .sdw-btn-actions { display:none; gap:4px; position:absolute; top:6px; right:6px; z-index:2; }
    #sdw-panel.edit-mode .sdw-btn-actions { display:flex; }
    .mini-act { width:22px; height:22px; display:flex; align-items:center; justify-content:center; border-radius:6px;
      background:rgba(0,0,0,.6); backdrop-filter:blur(4px); border:1px solid rgba(255,255,255,.15); color:var(--text-dim); font-size:10px; cursor:pointer; transition:.2s; }
    .mini-act:hover { background:rgba(255,255,255,.15); color:#fff; }
    .mini-act[data-action="del"]:hover { background:rgba(239,68,68,.3); color:#ef4444; }
    #sdw-edit-toggle.active { background:var(--accent)!important; color:#fff!important; }

    /* Emoji picker */
    .sdw-emoji-picker { display:flex; align-items:center; gap:8px; }
    .sdw-emoji-selected { width:44px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; background:#111827; border:2px solid var(--accent); border-radius:10px; flex-shrink:0; }
    .sdw-emoji-grid { display:grid; grid-template-columns:repeat(8,1fr); gap:2px; max-height:80px; overflow-y:auto; background:#111827; border:1px solid #334155; border-radius:8px; padding:4px; flex:1; }
    .sdw-emoji-grid::-webkit-scrollbar { width:4px; } .sdw-emoji-grid::-webkit-scrollbar-thumb { background:rgba(255,255,255,.15); border-radius:4px; }
    .sdw-emoji-opt { width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-size:14px; cursor:pointer; border-radius:6px; border:none; background:transparent; transition:.15s; }
    .sdw-emoji-opt:hover { background:rgba(255,255,255,.12); transform:scale(1.2); }
    .sdw-emoji-opt.active { background:rgba(168,85,247,.3); outline:2px solid var(--accent); }

    .sdw-site-badge { display:inline-flex; padding:2px 6px; border-radius:5px; font-size:8px; font-weight:800; text-transform:uppercase;
      background:rgba(168,85,247,.15); color:#a855f7; max-width:120px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

    /* Onboarding overlay */
    #sdw-onboarding { position:absolute; inset:0; background:var(--bg-glass); z-index:999; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:30px; text-align:center; border-radius:34px; gap:16px; }
    #sdw-onboarding h2 { font-size:22px; font-weight:900; margin:0; }
    #sdw-onboarding p { font-size:12px; color:var(--text-dim); margin:0; }
    .ob-input { width:100%; background:rgba(0,0,0,.3); border:1px solid #334155; border-radius:10px; padding:10px; color:#fff; font-size:12px; outline:none; text-align:center; box-sizing:border-box; }
    .ob-btn { width:100%; padding:14px; border-radius:14px; border:none; background:linear-gradient(135deg,#a855f7,#6366f1); color:#fff; font-weight:800; font-size:14px; cursor:pointer; }
    .ob-skip { background:none; border:none; color:var(--text-dim); font-size:11px; cursor:pointer; margin-top:4px; }
  `;

  // ═══════════════════════════════════════════
  // HTML
  // ═══════════════════════════════════════════
  const siteName = window.location.hostname.replace('www.','').substring(0,25);

  const panel = document.createElement('div');
  panel.id = 'sdw-panel';
  panel.innerHTML = `
    <div id="sdw-onboarding" style="display:none;"></div>
    <div id="sdw-settings-drawer">
      <div class="sdw-cfg-row">
        <input type="password" id="sdw-apikey" class="sdw-cfg-input" placeholder="gsk_..." autocomplete="off" spellcheck="false">
        <button id="sdw-test-api" class="sdw-cfg-btn" style="background:#6366f1;">TEST</button>
      </div>
      <div class="sdw-cfg-row">
        <select id="sdw-model-sel" class="sdw-cfg-select" style="flex:1;">
          <option value="llama-3.3-70b-versatile">Llama 3.3 70B</option>
          <option value="llama-3.1-8b-instant">Llama 3.1 8B Fast</option>
          <option value="mixtral-8x7b-32768">Mixtral 8x7B</option>
          <option value="gemma2-9b-it">Gemma 2 9B</option>
        </select>
        <select id="sdw-lang-sel" class="sdw-cfg-select" style="width:65px;">
          <option value="fr">🇫🇷 FR</option><option value="en">🇬🇧 EN</option><option value="es">🇪🇸 ES</option>
        </select>
        <button id="sdw-save-config" class="sdw-cfg-btn" style="background:#10b981;">OK</button>
      </div>
      <textarea id="sdw-global-inst" class="sdw-cfg-textarea" placeholder=""></textarea>
    </div>
    <header class="sdw-header">
      <div class="sdw-robot-box">
        <div class="sdw-holo-scanline"></div>
        <svg viewBox="0 0 200 200" class="sdw-holo-robot">
          <!-- Robot body with holographic glow -->
          <path d="M40,85 C40,40 70,30 100,30 C130,30 160,40 160,85 C160,120 135,135 100,135 C65,135 40,120 40,85 Z" fill="#ffffff" filter="drop-shadow(0 0 6px #89d4ff)"/>
          <circle cx="100" cy="35" r="10" style="animation:brainPulse 2s infinite;"/>
          <rect x="58" y="70" width="84" height="42" rx="18" fill="#121b26" stroke="#89d4ff" stroke-width="2"/>
          <circle cx="82" cy="91" r="7" fill="#89d4ff" filter="drop-shadow(0 0 4px #89d4ff)"/>
          <circle cx="118" cy="91" r="7" fill="#89d4ff" filter="drop-shadow(0 0 4px #89d4ff)"/>
        </svg>
      </div>
      <div style="flex:1;min-width:0;">
        <h1 class="sdw-title" style="margin:0;">Service Desk AI</h1>
        <div class="sdw-status"><span id="sdw-lbl">Llama 3.3 70B</span> ✓ <span class="sdw-site-badge" title="${esc(siteName)}">🌐 ${esc(siteName)}</span></div>
      </div>
      <div style="display:flex;gap:4px;">
        <button id="sdw-open-cfg" style="background:none;border:none;color:#475569;cursor:pointer;font-size:16px;" title="⚙">⚙</button>
        <button id="sdw-panel-close" style="background:none;border:none;color:#475569;cursor:pointer;font-size:16px;">✕</button>
      </div>
    </header>
    <div class="sdw-tabs">
      <div class="sdw-tab active" data-tab="main" id="sdw-tab-main">🤖 AGENTS</div>
      <div class="sdw-tab" data-tab="history" id="sdw-tab-hist">📋 HISTORIQUE</div>
      <div class="sdw-tab" data-tab="wiki" id="sdw-tab-wiki">📖 WIKI</div>
    </div>
    <main class="sdw-body">
      <div class="sdw-tab-content active" id="sdw-tc-main">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="sdw-label" id="sdw-lbl-source">SOURCE</span>
          <button id="sdw-read" style="color:var(--accent);border:none;background:none;cursor:pointer;font-weight:900;font-size:10px;">📋 LIRE</button>
        </div>
        <div class="sdw-input-card"><textarea id="sdw-source" class="sdw-textarea" placeholder=""></textarea></div>
        <section id="sdw-result-container">
          <div class="result-header">
            <div id="sdw-lbl-result" style="color:#10b981;font-weight:900;font-size:10px;">✨ RÉSULTAT IA</div>
            <div style="display:flex;gap:6px;align-items:center;">
              <span class="sdw-token-badge" id="sdw-tokens"></span>
              <button class="btn-copy" id="sdw-copy">COPIER</button>
              <button class="btn-inject" id="sdw-inject">↩ INJECTER</button>
              <button id="sdw-close-res" style="background:none;border:none;color:#475569;cursor:pointer;font-size:14px;">✕</button>
            </div>
          </div>
          <textarea id="sdw-output" class="sdw-textarea" readonly></textarea>
          <div class="sdw-refine-row">
            <input type="text" class="sdw-refine-input" id="sdw-refine" placeholder="">
            <button class="sdw-refine-btn" id="sdw-refine-btn">→</button>
          </div>
        </section>
        <div class="sdw-label" id="sdw-lbl-agents">AGENTS IA</div>
        <div id="sdw-grid" class="sdw-grid"></div>
        <button id="sdw-btn-add" style="width:100%;border:1px dashed var(--text-dim);background:none;color:var(--text-dim);padding:8px;border-radius:12px;font-size:10px;cursor:pointer;">＋</button>
      </div>
      <div class="sdw-tab-content" id="sdw-tc-history">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="sdw-label" id="sdw-lbl-hist">HISTORIQUE</span>
          <button id="sdw-clear-hist" style="color:#ef4444;border:none;background:none;cursor:pointer;font-weight:900;font-size:9px;">✕ VIDER</button>
        </div>
        <div id="sdw-hist-list"></div>
      </div>
      <div class="sdw-tab-content" id="sdw-tc-wiki"></div>
    </main>
    <footer style="padding:12px 18px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);flex-shrink:0;">
      <div style="display:flex;gap:10px;align-items:center;" id="theme-selector">
        <div class="dot active" style="background:#a855f7;" data-theme="midnight"></div>
        <div class="dot" style="background:#1e293b;" data-theme="obsidian"></div>
        <div class="dot" style="background:#10b981;" data-theme="aurora"></div>
        <div class="dot" style="background:#e2e8f0;" data-theme="ivory"></div>
        <div id="sdw-edit-toggle" style="width:22px;height:22px;display:flex;align-items:center;justify-content:center;border-radius:6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);cursor:pointer;font-size:11px;color:var(--text-dim);margin-left:2px;" title="Edit">✎</div>
      </div>
      <span id="sdw-monthly-tokens" style="font-size:8px;color:var(--text-dim);font-weight:700;"></span>
      <span style="font-size:8px;color:var(--text-dim);font-weight:800;">v13.0.0</span>
    </footer>`;

  const fab = document.createElement('div');
  fab.id = 'sdw-fab';
  fab.innerHTML = `<div class="holo-scanner"></div><svg class="robot-holo-svg" viewBox="0 0 200 200"><path d="M40,85 C40,40 70,30 100,30 C130,30 160,40 160,85 C160,120 135,135 100,135 C65,135 40,120 40,85 Z" fill="#ffffff" filter="drop-shadow(0 0 6px #89d4ff)"/><circle cx="100" cy="35" r="10" style="animation:brainPulse 2s infinite;"/><rect x="58" y="70" width="84" height="42" rx="18" fill="#121b26" stroke="#89d4ff" stroke-width="2"/><circle cx="82" cy="91" r="7" fill="#89d4ff" filter="drop-shadow(0 0 4px #89d4ff)"/><circle cx="118" cy="91" r="7" fill="#89d4ff" filter="drop-shadow(0 0 4px #89d4ff)"/></svg>`;

  const overlay = document.createElement('div');
  overlay.id = 'sdw-modal-overlay';
  overlay.innerHTML = `<div class="sdw-modal">
    <h2 id="m-title" style="font-weight:900;font-size:16px;color:#fff;">✎ Agent IA</h2>
    <label id="m-lbl-name" style="font-size:9px;color:#475569;">NOM</label>
    <input type="text" id="m-name" maxlength="40" style="width:100%;background:#111827;border:1px solid #334155;padding:8px;border-radius:8px;color:#fff;box-sizing:border-box;font-size:12px;">
    <label id="m-lbl-icon" style="font-size:9px;color:#475569;">ICÔNE</label>
    <div class="sdw-emoji-picker"><div class="sdw-emoji-selected" id="m-icon-preview">🤖</div><div class="sdw-emoji-grid" id="m-emoji-grid"></div></div>
    <input type="hidden" id="m-icon" value="🤖">
    <label id="m-lbl-prompt" style="font-size:9px;color:#475569;">PROMPT</label>
    <textarea id="m-prompt" maxlength="2000" style="width:100%;height:100px;background:#111827;border:1px solid #334155;padding:8px;border-radius:8px;color:#fff;font-size:11px;box-sizing:border-box;font-family:inherit;"></textarea>
    <div style="font-size:8px;color:#475569;text-align:right;"><span id="m-prompt-count">0</span>/2000</div>
    <label id="m-lbl-layout" style="font-size:9px;color:#475569;">DISPOSITION</label>
    <select id="m-layout" style="background:#111827;border:1px solid #334155;padding:6px;border-radius:8px;color:#fff;font-size:11px;width:100%;">
      <option value="grid" id="m-opt-grid">Grille</option><option value="full" id="m-opt-full">Pleine largeur</option>
    </select>
    <div style="display:flex;gap:8px;margin-top:6px;">
      <button id="m-cancel" style="flex:1;padding:10px;background:#1e293b;border:none;border-radius:10px;color:#fff;cursor:pointer;font-size:12px;">Annuler</button>
      <button id="m-save" style="flex:1;padding:10px;background:#9333ea;border:none;border-radius:10px;color:#fff;font-weight:800;cursor:pointer;font-size:12px;">Enregistrer</button>
    </div></div>`;

  document.body.appendChild(root);
  root.appendChild(style);
  root.appendChild(fab);
  root.appendChild(panel);
  root.appendChild(overlay);

  // ═══════════════════════════════════════════
  // LOGIC
  // ═══════════════════════════════════════════
  function applyTheme(n) {
    const p=document.getElementById('sdw-panel'), o=p.classList.contains('open'), e=p.classList.contains('edit-mode');
    p.className='theme-'+n; if(o)p.classList.add('open'); if(e)p.classList.add('edit-mode');
    document.querySelectorAll('.dot').forEach(d=>d.classList.toggle('active',d.dataset.theme===n));
    state.theme=n; saveState();
  }

  function applyLang() {
    const el=id=>document.getElementById(id);
    el('sdw-lbl-source').textContent=t('source'); el('sdw-read').textContent=t('readPage');
    el('sdw-source').placeholder=t('placeholder'); el('sdw-lbl-result').textContent=t('resultTitle');
    el('sdw-copy').textContent=t('copy'); el('sdw-inject').textContent=t('inject');
    el('sdw-lbl-agents').textContent=t('agents'); el('sdw-btn-add').textContent=t('addAgent');
    el('sdw-refine').placeholder=t('refinePh'); el('sdw-lbl-hist').textContent=t('historyTitle');
    el('sdw-clear-hist').textContent='✕ '+t('clearHistory');
    el('sdw-global-inst').placeholder=t('globalPh');
    el('sdw-tab-hist').textContent='📋 '+t('historyTitle').toUpperCase();
    el('sdw-tab-wiki').textContent='📖 '+t('wikiTitle').toUpperCase();
    // Modal
    el('m-title').textContent=t('modalTitle'); el('m-lbl-name').textContent=t('modalName');
    el('m-name').placeholder=t('modalNamePh'); el('m-lbl-icon').textContent=t('modalIcon');
    el('m-lbl-prompt').textContent=t('modalPrompt'); el('m-prompt').placeholder=t('modalPromptPh');
    el('m-lbl-layout').textContent=t('modalLayout'); el('m-opt-grid').textContent=t('layoutGrid');
    el('m-opt-full').textContent=t('layoutFull');
    el('m-cancel').textContent=t('modalCancel'); el('m-save').textContent=t('modalSave');
    renderWiki();
  }

  function updateTokenDisplay() {
    const el=document.getElementById('sdw-monthly-tokens');
    if(el) el.textContent=state.tokenUsage.total.toLocaleString()+' '+t('tokensLabel')+'/mo';
  }

  // --- ONBOARDING ---
  function showOnboarding() {
    const ob=document.getElementById('sdw-onboarding');
    ob.style.display='flex';
    ob.innerHTML=`
      <div style="position:relative; width:72px; height:72px; margin:0 auto 16px;">
        <div style="position:absolute; top:-8px; left:-8px; right:-8px; bottom:-8px; background:radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%); border-radius:28px; z-index:-1;"></div>
        <div style="width:72px; height:72px; background:linear-gradient(135deg, #1e1b4b, #312e81); border-radius:20px; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 32px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.05);">
          <svg viewBox="0 0 200 200" width="44" height="44" style="margin-top:2px;">
            <defs>
              <filter id="ob-neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path d="M40,85 C40,40 70,30 100,30 C130,30 160,40 160,85 C160,120 135,135 100,135 C65,135 40,120 40,85 Z" fill="#ffffff" filter="drop-shadow(0 0 4px #a855f7)"/>
            <circle cx="100" cy="35" r="10" fill="#a855f7" filter="url(#ob-neon-glow)"/>
            <rect x="55" y="70" width="90" height="44" rx="18" fill="#0d1224" stroke="#a855f7" stroke-width="2"/>
            <circle cx="82" cy="92" r="8" fill="#89d4ff" filter="url(#ob-neon-glow)"/>
            <circle cx="118" cy="92" r="8" fill="#89d4ff" filter="url(#ob-neon-glow)"/>
            <path d="M40,85 L20,70 M160,85 L180,70" stroke="#a855f7" stroke-width="6" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
      <h2>${t('obWelcome')}</h2>
      <p>${t('obDesc')}</p>
      <div style="width:100%;margin-top:10px;">
        <p style="font-size:10px;font-weight:800;color:var(--text-dim);margin-bottom:6px;">${t('obStep1')}</p>
        <input type="password" class="ob-input" id="ob-apikey" placeholder="gsk_..." autocomplete="off">
        <p style="font-size:9px;color:var(--text-dim);margin-top:4px;">${t('obStep1d')}</p>
      </div>
      <div style="width:100%;">
        <p style="font-size:10px;font-weight:800;color:var(--text-dim);margin-bottom:6px;">${t('obStep2')}</p>
        <select class="ob-input" id="ob-lang" style="text-align-last:center;">
          <option value="fr">🇫🇷 Français</option><option value="en">🇬🇧 English</option><option value="es">🇪🇸 Español</option>
        </select>
      </div>
      <button class="ob-btn" id="ob-start">${t('obStart')}</button>
      <button class="ob-skip" id="ob-skip">${t('obSkip')}</button>`;

    document.getElementById('ob-lang').value=state.lang;
    document.getElementById('ob-lang').onchange=()=>{ state.lang=document.getElementById('ob-lang').value; applyLang(); showOnboarding(); };

    document.getElementById('ob-start').onclick=async()=>{
      const key=document.getElementById('ob-apikey').value.trim();
      if(key) state.apiKey=key;
      state.onboarded=true;
      state.buttons=getDefaultButtons(state.lang);
      await saveState(); ob.style.display='none';
      document.getElementById('sdw-apikey').value=state.apiKey;
      applyLang(); renderButtons();
    };
    document.getElementById('ob-skip').onclick=async()=>{
      state.onboarded=true; await saveState(); ob.style.display='none';
    };
  }

  // --- TABS ---
  document.querySelectorAll('.sdw-tab').forEach(tab=>{
    tab.onclick=()=>{
      document.querySelectorAll('.sdw-tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.sdw-tab-content').forEach(c=>c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('sdw-tc-'+tab.dataset.tab).classList.add('active');
      if(tab.dataset.tab==='history') renderHistory();
      if(tab.dataset.tab==='wiki') renderWiki();
    };
  });

  // --- RENDER ---
  function renderButtons() {
    const grid=document.getElementById('sdw-grid'); grid.innerHTML='';
    state.buttons.forEach(btn=>{
      const el=document.createElement('div');
      el.className=`sdw-btn ${btn.layout==='full'?'sdw-btn-primary':''}`;
      el.innerHTML=`<span style="font-size:16px;">${esc(btn.icon)}</span><div style="display:flex;flex-direction:column;overflow:hidden;flex:1;"><span style="font-weight:800;font-size:12px;">${esc(btn.name)}</span><span style="font-size:7px;opacity:.7;">${esc(btn.desc||'')}</span></div><div class="sdw-btn-actions"><div class="mini-act" data-id="${btn.id}" data-action="edit">✎</div><div class="mini-act" data-id="${btn.id}" data-action="del">✕</div></div>`;
      el.onclick=e=>{ if(!e.target.closest('.mini-act')) generate(btn,el); };
      grid.appendChild(el);
    });
    document.querySelectorAll('.mini-act').forEach(a=>{
      a.onclick=e=>{ e.stopPropagation(); const id=parseInt(a.dataset.id); a.dataset.action==='edit'?openModal(id):deleteBtn(id); };
    });
  }

  function renderHistory() {
    const list=document.getElementById('sdw-hist-list'); list.innerHTML='';
    if(!state.history.length) { list.innerHTML=`<p style="text-align:center;font-size:11px;color:var(--text-dim);padding:20px;">${t('historyEmpty')}</p>`; return; }
    state.history.slice().reverse().forEach((h,i)=>{
      const el=document.createElement('div'); el.className='sdw-hist-item';
      const d=new Date(h.ts);
      el.innerHTML=`<div class="sdw-hist-meta"><span>${esc(h.agent)}</span><span>${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span></div><div class="sdw-hist-text">${esc(h.result.substring(0,120))}...</div>`;
      el.onclick=()=>{
        document.getElementById('sdw-source').value=h.source;
        document.getElementById('sdw-output').value=h.result;
        document.getElementById('sdw-result-container').style.display='block';
        document.querySelectorAll('.sdw-tab')[0].click(); // switch to main tab
      };
      list.appendChild(el);
    });
  }

  function renderWiki(){
    const w=document.getElementById('sdw-tc-wiki'); if(!w) return;
    w.innerHTML=`
      <style>
        .sdw-switch { position: relative; display: inline-block; width: 32px; height: 18px; }
        .sdw-switch input { opacity: 0; width: 0; height: 0; }
        .sdw-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #334155; transition: .4s; border-radius: 18px; }
        .sdw-slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 2px; bottom: 2px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .sdw-slider { background-color: #10b981; }
        input:checked + .sdw-slider:before { transform: translateX(14px); }
      </style>
      <div class="sdw-wiki-card" style="border-color:#10b981;background:linear-gradient(135deg,rgba(16,185,129,.08),rgba(139,92,246,.05));margin-bottom:12px;">
        <h4 style="color:#34d399;">⚙️ Wiki Configuration</h4>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;">
          <span style="font-size:11px;font-weight:700;">🔎 Web Scraping (Active or Target URL)</span>
          <label class="sdw-switch"><input type="checkbox" id="sdw-toggle-scraping" ${state.useScraping?'checked':''}><span class="sdw-slider"></span></label>
        </div>
        <p style="font-size:9px;color:var(--text-dim);margin-top:4px;">Automatically secure reads active page, or define a specific URL to scrape background:</p>
        
        <div id="sdw-scrap-config" style="display:${state.useScraping?'block':'none'};margin-top:8px;">
          <input type="text" id="sdw-scrap-url" class="sdw-cfg-input" style="width:100%;" placeholder="Optional: https://wiki..." value="${state.scrapUrl||''}">
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;">
          <span style="font-size:11px;font-weight:700;">🧠 Enterprise RAG Backend</span>
          <label class="sdw-switch"><input type="checkbox" id="sdw-toggle-rag" ${state.useRag?'checked':''}><span class="sdw-slider"></span></label>
        </div>
        <p style="font-size:9px;color:var(--text-dim);margin-top:4px;margin-bottom:8px;">When enabled, securely routes requests to your custom Vector DB backend.</p>
        
        <div id="sdw-rag-config" style="display:${state.useRag?'block':'none'};margin-top:8px;">
          <input type="text" id="sdw-rag-url" class="sdw-cfg-input" style="width:100%;margin-bottom:6px;" placeholder="https://api.your-company.com/v1/chat" value="${state.ragUrl||''}">
          <button id="sdw-save-wiki" class="sdw-cfg-btn" style="width:100%;background:#10b981;">SAVE WIKI CONFIG</button>
        </div>
      </div>
      
      <div class="sdw-wiki-card" style="border-color:#6366f1;background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(139,92,246,.05));">
        <h4 style="color:#818cf8;">📖 ${t('wikiGuideTitle')}</h4>
        <p style="margin-bottom:6px;">${t('wikiGuideDesc')}</p>
        <p>${t('wikiGuideNoConfig')}</p>
      </div>
      <div class="sdw-wiki-card">
        <h4>🔎 ${t('wikiM1Title')}</h4>
        <p><span class="sdw-wiki-tag method">${t('wikiM1Tag')}</span></p>
        <p style="margin-top:6px;font-weight:700;color:#c4b5fd;font-size:10px;">${t('wikiM1Principle')} :</p>
        <p>${t('wikiM1Desc')}</p>
        <div class="sdw-wiki-flow" style="margin-top:10px;">
          <div class="sdw-wiki-step"><div class="sdw-wiki-step-num">1</div><div class="sdw-wiki-step-text">${t('wikiM1S1')}</div></div>
          <div class="sdw-wiki-arrow">↓</div>
          <div class="sdw-wiki-step"><div class="sdw-wiki-step-num">2</div><div class="sdw-wiki-step-text">${t('wikiM1S2')}</div></div>
          <div class="sdw-wiki-arrow">↓</div>
          <div class="sdw-wiki-step"><div class="sdw-wiki-step-num">3</div><div class="sdw-wiki-step-text">${t('wikiM1S3')}</div></div>
        </div>
        <div class="sdw-wiki-coming" style="margin-top:10px;">
          <div class="icon">🚧</div>
          <div class="label">${t('wikiComingSoon')}</div>
          <div class="sub">${t('wikiComingSoonDesc')}</div>
          <div class="sub" style="margin-top:4px;">${t('wikiComingSoonReq')}</div>
        </div>
      </div>
      <div class="sdw-wiki-vs"><div class="sdw-wiki-vs-line"></div><span class="sdw-wiki-vs-text">VS</span><div class="sdw-wiki-vs-line"></div></div>
      <div class="sdw-wiki-card">
        <h4>🧠 ${t('wikiM2Title')}</h4>
        <p><span class="sdw-wiki-tag method">${t('wikiM2Tag')}</span></p>
        <p style="margin-top:6px;font-weight:700;color:#c4b5fd;font-size:10px;">${t('wikiM2Principle')} :</p>
        <p>${t('wikiM2Desc')}</p>
        <p style="margin-top:10px;font-weight:700;color:#c4b5fd;font-size:10px;">${t('wikiM2Flow')} :</p>
        <div class="sdw-wiki-flow">
          <div class="sdw-wiki-step"><div class="sdw-wiki-step-num">1</div><div class="sdw-wiki-step-text">${t('wikiM2S1')}</div></div>
          <div class="sdw-wiki-arrow">↓</div>
          <div class="sdw-wiki-step"><div class="sdw-wiki-step-num">2</div><div class="sdw-wiki-step-text">${t('wikiM2S2')}</div></div>
          <div class="sdw-wiki-arrow">↓</div>
          <div class="sdw-wiki-step"><div class="sdw-wiki-step-num">3</div><div class="sdw-wiki-step-text">${t('wikiM2S3')}</div></div>
          <div class="sdw-wiki-arrow">↓</div>
          <div class="sdw-wiki-step"><div class="sdw-wiki-step-num">4</div><div class="sdw-wiki-step-text">${t('wikiM2S4')}</div></div>
          <div class="sdw-wiki-arrow">↓</div>
          <div class="sdw-wiki-step"><div class="sdw-wiki-step-num">5</div><div class="sdw-wiki-step-text">${t('wikiM2S5')}</div></div>
          <div class="sdw-wiki-arrow">↓</div>
          <div class="sdw-wiki-step"><div class="sdw-wiki-step-num">6</div><div class="sdw-wiki-step-text">${t('wikiM2S6')}</div></div>
        </div>
      </div>
      <div class="sdw-wiki-card">
        <h4>📊 ${t('wikiCompTitle')}</h4>
        <table style="width:100%;font-size:9px;color:var(--text-dim);border-collapse:collapse;margin-top:6px;">
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:4px 6px;font-weight:800;color:#c4b5fd;">${t('wikiCompCriteria')}</td>
            <td style="padding:4px 6px;text-align:center;font-weight:800;color:#818cf8;">🔎 ${t('wikiCompScraping')}</td>
            <td style="padding:4px 6px;text-align:center;font-weight:800;color:#818cf8;">🧠 ${t('wikiCompRAG')}</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,.04);">
            <td style="padding:3px 6px;">${t('wikiCompSetup')}</td>
            <td style="padding:3px 6px;text-align:center;">${t('wikiCompSetupS')}</td>
            <td style="padding:3px 6px;text-align:center;">${t('wikiCompSetupR')}</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,.04);">
            <td style="padding:3px 6px;">${t('wikiCompSearch')}</td>
            <td style="padding:3px 6px;text-align:center;">${t('wikiCompSearchS')}</td>
            <td style="padding:3px 6px;text-align:center;">${t('wikiCompSearchR')}</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,.04);">
            <td style="padding:3px 6px;">${t('wikiCompInfra')}</td>
            <td style="padding:3px 6px;text-align:center;">${t('wikiCompInfraS')}</td>
            <td style="padding:3px 6px;text-align:center;">${t('wikiCompInfraR')}</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,.04);">
            <td style="padding:3px 6px;">${t('wikiCompAccuracy')}</td>
            <td style="padding:3px 6px;text-align:center;">${t('wikiCompAccuracyS')}</td>
            <td style="padding:3px 6px;text-align:center;">${t('wikiCompAccuracyR')}</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,.04);">
            <td style="padding:3px 6px;">${t('wikiCompCost')}</td>
            <td style="padding:3px 6px;text-align:center;">${t('wikiCompCostS')}</td>
            <td style="padding:3px 6px;text-align:center;">${t('wikiCompCostR')}</td>
          </tr>
          <tr>
            <td style="padding:3px 6px;">${t('wikiCompIdeal')}</td>
            <td style="padding:3px 6px;text-align:center;">${t('wikiCompIdealS')}</td>
            <td style="padding:3px 6px;text-align:center;">${t('wikiCompIdealR')}</td>
          </tr>
        </table>
      </div>
      <div class="sdw-wiki-card">
        <h4>⚖️ ${t('wikiProConTitle')}</h4>
        <p style="margin-bottom:4px;"><span class="sdw-wiki-tag pro">${t('wikiProLabel')}</span></p>
        <ul>
          <li>${t('wikiPro1')}</li><li>${t('wikiPro2')}</li><li>${t('wikiPro3')}</li><li>${t('wikiPro4')}</li><li>${t('wikiPro5')}</li>
        </ul>
        <p style="margin-top:6px;margin-bottom:4px;"><span class="sdw-wiki-tag con">${t('wikiConLabel')}</span></p>
        <ul>
          <li>${t('wikiCon1')}</li><li>${t('wikiCon2')}</li><li>${t('wikiCon3')}</li><li>${t('wikiCon4')}</li><li>${t('wikiCon5')}</li>
        </ul>
      </div>
      <div class="sdw-wiki-card" style="text-align:center;border-color:#6366f1;background:linear-gradient(135deg,rgba(99,102,241,.06),rgba(139,92,246,.04));">
        <p style="font-size:10px;font-weight:700;color:#a78bfa;">📌 ${t('wikiStatusTitle')}</p>
        <p style="font-size:9px;margin-top:4px;">${t('wikiStatusDesc')}</p>
        <p style="font-size:9px;margin-top:4px;">${t('wikiStatusMethods')}</p>
        <p style="font-size:8px;margin-top:6px;color:var(--text-dim);">${t('wikiStatusHelp')}</p>
      </div>`;
      
    // Bind Wiki Events
    setTimeout(() => {
      const tScrap = document.getElementById('sdw-toggle-scraping');
      const tRag = document.getElementById('sdw-toggle-rag');
      const boxRag = document.getElementById('sdw-rag-config');
      const boxScrap = document.getElementById('sdw-scrap-config');
      const btnSave = document.getElementById('sdw-save-wiki');
      
      if(tScrap) tScrap.onchange = async () => { 
        state.useScraping = tScrap.checked; 
        boxScrap.style.display = tScrap.checked ? 'block' : 'none';
        await saveState(); 
      };
      if(tRag) tRag.onchange = async () => { 
        state.useRag = tRag.checked; 
        boxRag.style.display = tRag.checked ? 'block' : 'none';
        await saveState();
      };
      if(btnSave) btnSave.onclick = async () => {
        state.ragUrl = document.getElementById('sdw-rag-url').value.trim();
        state.scrapUrl = document.getElementById('sdw-scrap-url').value.trim();
        await saveState();
        btnSave.innerText = 'SAVED ✓';
        setTimeout(()=>btnSave.innerText = 'SAVE WIKI CONFIG', 2000);
      };
    }, 50);
  }

  // --- GENERATE (with token tracking + history) ---
  async function generate(btn, btnEl) {
    if(!state.apiKey){ document.getElementById('sdw-settings-drawer').classList.add('open'); return; }
    const src=document.getElementById('sdw-source').value.trim();
    if(!src) return;

    // Track source field for injection
    lastSourceField=document.activeElement;

    const resContainer=document.getElementById('sdw-result-container');
    const outArea=document.getElementById('sdw-output');
    resContainer.style.display='block'; outArea.value=t('generating');
    if(btnEl) btnEl.classList.add('sdw-loading');

    // Reset conversation for new generation
    currentPrompt=btn.prompt;
    let finalPrompt = btn.prompt;
    if (state.useScraping) {
      let pageText = '';
      if (state.scrapUrl && state.scrapUrl.startsWith('http')) {
        try {
          const proxyResp = await new Promise(res => chrome.runtime.sendMessage({ action: 'scrape_url', url: state.scrapUrl }, res));
          if (proxyResp && proxyResp.ok) pageText = proxyResp.text;
        } catch(e) {}
      } else {
        pageText = readPageContent();
      }
      if (pageText) finalPrompt += "\n\n[Scraped Context]:\n" + pageText;
    }
    
    currentConversation=[{ role:'user', content:src }];

    try {
      const resp=await new Promise((resolve,reject)=>{
        chrome.runtime.sendMessage({
          action:'groq_request', apiKey:state.apiKey, model:state.model,
          systemPrompt:finalPrompt, globalInstruction:state.globalInstruction,
          useRag:state.useRag, ragUrl:state.ragUrl,
          messages:[{role:'user',content:src}]
        }, r=>{ if(chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message)); else resolve(r); });
      });

      if(resp.ok){
        outArea.value=resp.result;
        currentConversation.push({role:'assistant',content:resp.result});
        // Token display
        if(resp.tokens){
          document.getElementById('sdw-tokens').textContent=`${resp.tokens.total} ${t('tokensLabel')}`;
          state.tokenUsage.total+=resp.tokens.total;
          updateTokenDisplay();
        }
        // History (max 50)
        state.history.push({ agent:btn.name, source:src.substring(0,500), result:resp.result.substring(0,1000), ts:Date.now() });
        if(state.history.length>50) state.history.shift();
        await saveState();
      } else { outArea.value='❌ '+(resp.error||'Error'); }

      const body=resContainer.closest('.sdw-body');
      if(body) body.scrollTo({top:resContainer.offsetTop-body.offsetTop, behavior:'smooth'});
    } catch(e){ outArea.value=t('errorComm'); }
    finally { if(btnEl) btnEl.classList.remove('sdw-loading'); }
  }

  // --- ITERATE / REFINE ---
  async function refine() {
    const input=document.getElementById('sdw-refine').value.trim();
    if(!input||!currentConversation.length) return;
    const outArea=document.getElementById('sdw-output');
    outArea.value=t('generating');
    currentConversation.push({role:'user',content:input});
    document.getElementById('sdw-refine').value='';

    let finalPrompt = currentPrompt;
    if (state.useScraping) {
      let pageText = '';
      if (state.scrapUrl && state.scrapUrl.startsWith('http')) {
        try {
          const proxyResp = await new Promise(res => chrome.runtime.sendMessage({ action: 'scrape_url', url: state.scrapUrl }, res));
          if (proxyResp && proxyResp.ok) pageText = proxyResp.text;
        } catch(e) {}
      } else {
        pageText = readPageContent();
      }
      if (pageText) finalPrompt += "\n\n[Scraped Context]:\n" + pageText;
    }

    try{
      const resp=await new Promise((resolve,reject)=>{
        chrome.runtime.sendMessage({
          action:'groq_request', apiKey:state.apiKey, model:state.model,
          systemPrompt:finalPrompt, globalInstruction:state.globalInstruction,
          useRag:state.useRag, ragUrl:state.ragUrl,
          messages:currentConversation
        }, r=>{ if(chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message)); else resolve(r); });
      });
      if(resp.ok){
        outArea.value=resp.result;
        currentConversation.push({role:'assistant',content:resp.result});
        if(resp.tokens){
          document.getElementById('sdw-tokens').textContent=`${resp.tokens.total} ${t('tokensLabel')}`;
          state.tokenUsage.total+=resp.tokens.total; updateTokenDisplay(); await saveState();
        }
      } else { outArea.value='❌ '+(resp.error||'Error'); }
    } catch(e){ outArea.value=t('errorComm'); }
  }

  // --- UNIVERSAL READER ---
  function readPageContent() {
    const sel=window.getSelection().toString().trim(); if(sel) return sel;
    const active=document.activeElement;
    if(active&&(active.tagName==='TEXTAREA'||(active.tagName==='INPUT'&&active.type==='text'))){
      if(active.value.trim()){ lastSourceField=active; return active.value.trim(); }
    }
    const parts=[];
    document.querySelectorAll('textarea,input[type="text"]').forEach(f=>{ if(f.value.trim()&&f.offsetParent!==null) parts.push(f.value.trim()); });
    if(parts.length>0) return parts.join('\n\n');
    const main=document.querySelector('main,article,[role="main"],.content,#content');
    if(main){ const t=main.innerText.substring(0,5000).trim(); if(t) return t; }
    return '';
  }

  // ═══════════════════════════════════════════
  // EVENTS
  // ═══════════════════════════════════════════
  function handleFabClick(e) {
    if (dragHasMoved) return; // Prevent click if we were dragging
    panel.classList.toggle('open');
  }

  // Event handlers attached below during DRAG LOGIC
  document.getElementById('sdw-panel-close').onclick=()=>panel.classList.remove('open');
  document.getElementById('sdw-open-cfg').onclick=()=>document.getElementById('sdw-settings-drawer').classList.toggle('open');
  document.getElementById('sdw-close-res').onclick=()=>{ document.getElementById('sdw-result-container').style.display='none'; currentConversation=[]; };

  document.getElementById('sdw-copy').onclick=()=>{
    navigator.clipboard.writeText(document.getElementById('sdw-output').value).then(()=>{
      document.getElementById('sdw-copy').innerText=t('copied');
      setTimeout(()=>document.getElementById('sdw-copy').innerText=t('copy'),2000);
    }).catch(()=>{
      document.getElementById('sdw-output').select(); document.execCommand('copy');
      document.getElementById('sdw-copy').innerText=t('copied');
      setTimeout(()=>document.getElementById('sdw-copy').innerText=t('copy'),2000);
    });
  };

  // --- INJECT BUTTON ---
  document.getElementById('sdw-inject').onclick=()=>{
    const result=document.getElementById('sdw-output').value;
    // Try last known source field, or find active textarea/input
    let target=lastSourceField;
    if(!target||!target.isConnected||target.offsetParent===null){
      target=document.querySelector('textarea:focus,input[type="text"]:focus');
    }
    if(!target){
      // Find first visible textarea that isn't ours
      const candidates=document.querySelectorAll('textarea,input[type="text"]');
      for(const c of candidates){
        if(!c.closest('#sdw-root')&&c.offsetParent!==null){ target=c; break; }
      }
    }
    if(target&&!target.closest('#sdw-root')){
      target.focus();
      target.value=result;
      target.dispatchEvent(new Event('input',{bubbles:true}));
      target.dispatchEvent(new Event('change',{bubbles:true}));
      const btn=document.getElementById('sdw-inject');
      btn.innerText=t('injected'); btn.style.background='#10b981';
      setTimeout(()=>{ btn.innerText=t('inject'); btn.style.background='#6366f1'; },2000);
    }
  };

  document.getElementById('sdw-read').onclick=()=>{
    document.getElementById('sdw-source').value=readPageContent()||t('noContent');
  };

  // --- REFINE ---
  document.getElementById('sdw-refine-btn').onclick=refine;
  document.getElementById('sdw-refine').onkeydown=e=>{ if(e.key==='Enter') refine(); };

  // --- SETTINGS SAVE ---
  document.getElementById('sdw-save-config').onclick=async()=>{
    state.apiKey=document.getElementById('sdw-apikey').value.trim();
    state.model=document.getElementById('sdw-model-sel').value;
    state.globalInstruction=document.getElementById('sdw-global-inst').value.trim();
    const newLang=document.getElementById('sdw-lang-sel').value;
    const langChanged=newLang!==state.lang; state.lang=newLang;
    const sel=document.getElementById('sdw-model-sel');
    document.getElementById('sdw-lbl').innerText=sel.options[sel.selectedIndex].text;
    await saveState(); document.getElementById('sdw-settings-drawer').classList.remove('open');
    if(langChanged){ applyLang(); if(state.buttons.length===8&&state.buttons[0].id<=8){ state.buttons=getDefaultButtons(state.lang); await saveState(); renderButtons(); }}
  };

  // --- TEST API ---
  document.getElementById('sdw-test-api').onclick=async()=>{
    const key=document.getElementById('sdw-apikey').value.trim(),btn=document.getElementById('sdw-test-api');
    btn.innerText='⏳'; btn.disabled=true;
    try{
      const r=await new Promise((res,rej)=>{ chrome.runtime.sendMessage({action:'test_api',apiKey:key},r=>{if(chrome.runtime.lastError)rej(new Error(chrome.runtime.lastError.message));else res(r);}); });
      btn.innerText=r.ok?'OK ✓':'FAIL'; btn.style.background=r.ok?'#10b981':'#ef4444';
    }catch(e){btn.innerText='ERR';btn.style.background='#ef4444';}
    setTimeout(()=>{btn.innerText='TEST';btn.style.background='#6366f1';btn.disabled=false;},3000);
  };

  // --- HISTORY ---
  document.getElementById('sdw-clear-hist').onclick=async()=>{
    state.history=[]; await saveState(); renderHistory();
  };

  // --- BUTTON CRUD ---
  function deleteBtn(id){ if(!confirm(t('deleteConfirm')))return; state.buttons=state.buttons.filter(x=>x.id!==id); saveState(); renderButtons(); }

  const EMOJI_SET=['✅','🧾','✏️','🔍','🔄','😊','🏢','💡','🤖','⚡','🎯','📌','📝','📋','📊','📈','🔧','🛠️','💻','🖥️','📱','🌐','🔒','🔑','⭐','🚀','💬','📢','📧','📞','🎫','🗂️','📁','💾','🧪','🔬','❤️','🟢','🔵','🟣','🟡','🔴','⚠️','❌','✨','🎨','🧠','👤'];

  function buildEmojiGrid(sel){
    const g=document.getElementById('m-emoji-grid'),p=document.getElementById('m-icon-preview'),h=document.getElementById('m-icon');
    g.innerHTML='';
    EMOJI_SET.forEach(e=>{
      const b=document.createElement('button'); b.type='button'; b.className='sdw-emoji-opt'+(e===sel?' active':''); b.textContent=e;
      b.onclick=ev=>{ev.preventDefault();ev.stopPropagation();h.value=e;p.textContent=e;g.querySelectorAll('.sdw-emoji-opt').forEach(x=>x.classList.remove('active'));b.classList.add('active');};
      g.appendChild(b);
    });
  }

  function openModal(id=null){
    overlay.style.display='flex'; applyLang();
    const n=document.getElementById('m-name'),ic=document.getElementById('m-icon'),pr=document.getElementById('m-prompt'),
      la=document.getElementById('m-layout'),co=document.getElementById('m-prompt-count'),pv=document.getElementById('m-icon-preview');
    n.value='';ic.value='🤖';pv.textContent='🤖';pr.value='';la.value='grid';co.textContent='0';
    let ci='🤖';
    if(id){ const b=state.buttons.find(x=>x.id===id); if(b){ n.value=b.name;ci=b.icon||'🤖';ic.value=ci;pv.textContent=ci;pr.value=b.prompt;la.value=b.layout||'grid';co.textContent=b.prompt.length; }}
    buildEmojiGrid(ci);
    pr.oninput=()=>{co.textContent=pr.value.length;};
    document.getElementById('m-save').onclick=async()=>{
      const name=n.value.trim(),icon=ic.value.trim()||'🤖',prompt=pr.value.trim(),layout=la.value;
      if(!name||!prompt)return;
      if(id){const i=state.buttons.findIndex(x=>x.id===id);if(i!==-1)state.buttons[i]={...state.buttons[i],name,icon,prompt,layout};}
      else state.buttons.push({id:Date.now(),name,icon,desc:'',layout,prompt});
      await saveState(); renderButtons(); overlay.style.display='none';
    };
  }

  document.getElementById('m-cancel').onclick=()=>overlay.style.display='none';
  overlay.onclick=e=>{if(e.target===overlay)overlay.style.display='none';};
  document.getElementById('sdw-btn-add').onclick=()=>openModal();
  document.getElementById('theme-selector').onclick=e=>{if(e.target.dataset.theme)applyTheme(e.target.dataset.theme);};
  document.getElementById('sdw-edit-toggle').onclick=e=>{
    e.stopPropagation(); document.getElementById('sdw-panel').classList.toggle('edit-mode'); document.getElementById('sdw-edit-toggle').classList.toggle('active');
  };

  function spawnStarDust(x, y) {
    const star = document.createElement('div');
    star.className = 'sdw-star-dust';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    const dx = (Math.random() - 0.5) * 60 + 'px';
    const dy = (Math.random() - 0.5) * 60 + 'px';
    star.style.setProperty('--dx', dx);
    star.style.setProperty('--dy', dy);
    // Randomize colors slightly for magic effect
    const colors = ['#fff', '#a855f7', '#89d4ff'];
    star.style.background = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('sdw-root').appendChild(star);
    setTimeout(() => star.remove(), 800);
  }

  // --- DRAG LOGIC ---
  let dragTarget = null;
  let dragStartX = 0, dragStartY = 0, initialRight = 0, initialBottom = 0;
  let dragHasMoved = false; // Used to differentiate click from drag on FAB
  const header = panel.querySelector('.sdw-header');
  
  function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }
  
  function handleDragStart(e) {
    // Determine what we are dragging
    const isFab = e.currentTarget === fab;
    const isHeader = e.currentTarget === header;
    
    // Prevent drag if clicking buttons inside header
    if (isHeader && (e.target.closest('button') || e.target.closest('#theme-selector'))) return;
    
    dragTarget = isFab ? fab : panel;
    dragHasMoved = false;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStartX = clientX; dragStartY = clientY;
    
    // Get current right/bottom from computed style or state
    const rect = dragTarget.getBoundingClientRect();
    initialRight = window.innerWidth - rect.right;
    initialBottom = window.innerHeight - rect.bottom;
    
    // Prevent text selection during drag
    e.preventDefault();
  }
  
  function handleDragMove(e) {
    if (!dragTarget) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const deltaX = dragStartX - clientX;
    const deltaY = dragStartY - clientY;
    
    // If we moved more than 5px, it's a drag not a click
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      dragHasMoved = true;
    }
    
    if (dragHasMoved) {
      let newRight = initialRight + deltaX;
      let newBottom = initialBottom + deltaY;
      
      // Clamp to screen bounds
      const rect = dragTarget.getBoundingClientRect();
      newRight = clamp(newRight, 0, window.innerWidth - rect.width);
      newBottom = clamp(newBottom, 0, window.innerHeight - rect.height);
      
      dragTarget.style.right = newRight + 'px';
      dragTarget.style.bottom = newBottom + 'px';
      
      // Magic dust
      if (Math.random() > 0.4) spawnStarDust(clientX, clientY);
    }
  }
  
  function handleDragEnd(e) {
    if (!dragTarget) return;
    
    // If it was the FAB and we barely moved, trigger click
    if (dragTarget === fab && !dragHasMoved) {
      handleFabClick(e);
    } else if (dragHasMoved) {
      // Save position
      const rect = dragTarget.getBoundingClientRect();
      const pos = { right: window.innerWidth - rect.right, bottom: window.innerHeight - rect.bottom };
      if (dragTarget === fab) state.fabPos = pos;
      else state.panelPos = pos;
      saveState();
    }
    
    dragTarget = null;
  }
  
  header.addEventListener('mousedown', handleDragStart);
  fab.addEventListener('mousedown', handleDragStart);
  window.addEventListener('mousemove', handleDragMove);
  window.addEventListener('mouseup', handleDragEnd);
  
  header.addEventListener('touchstart', handleDragStart, {passive: false});
  fab.addEventListener('touchstart', handleDragStart, {passive: false});
  window.addEventListener('touchmove', handleDragMove, {passive: false});
  window.addEventListener('touchend', handleDragEnd);

  // ═══════════════════════════════════════════
  // BACKGROUND MESSAGES (context menu + shortcut)
  // ═══════════════════════════════════════════
  chrome.runtime.onMessage.addListener((msg)=>{
    if(msg.action==='toggle_panel'){ panel.classList.toggle('open'); }
    if(msg.action==='context_menu_action'){
      panel.classList.add('open');
      document.getElementById('sdw-source').value=msg.text;
      // Auto-generate with context menu prompt
      generate({name:'Quick',icon:'⚡',prompt:msg.prompt,layout:'grid'},null);
    }
  });

  // ═══════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════
  loadState().then(()=>{
    document.getElementById('sdw-apikey').value=state.apiKey||'';
    document.getElementById('sdw-model-sel').value=state.model||'llama-3.3-70b-versatile';
    document.getElementById('sdw-lang-sel').value=state.lang||'fr';
    document.getElementById('sdw-global-inst').value=state.globalInstruction||'';
    applyTheme(state.theme||'midnight');
    if (state.panelPos) {
      panel.style.right = state.panelPos.right + 'px';
      panel.style.bottom = state.panelPos.bottom + 'px';
    }
    if (state.fabPos) {
      fab.style.right = state.fabPos.right + 'px';
      fab.style.bottom = state.fabPos.bottom + 'px';
    }
    applyLang(); renderButtons(); updateTokenDisplay();
    // Show onboarding if first launch
    if(!state.onboarded){ panel.classList.add('open'); showOnboarding(); }
  });

})();
