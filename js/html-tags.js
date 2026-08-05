(function () {
  const groups = {
    semantica: [
      ["header", "Cabeçalho da página ou de uma seção. Logo, título e navegação."],
      ["nav", "Bloco de links de navegação principal ou secundária."],
      ["main", "Conteúdo principal e único da página."],
      ["section", "Agrupa conteúdo temático. Hero, blocos e áreas da página."],
      ["article", "Conteúdo independente: post, card, notícia ou comentário."],
      ["aside", "Conteúdo lateral relacionado: sidebar, filtros e widgets."],
      ["footer", "Rodapé da página ou de uma seção."],
      ["search", "Região de busca do site."],
      ["div", "Container genérico sem significado semântico."],
      ["span", "Trecho inline genérico sem significado semântico."],
    ],
    conteudo: [
      ["h1", "Título principal. Um por página, hierarquia mais alta."],
      ["h2", "Subtítulo de seção."],
      ["h3", "Subtítulo de bloco dentro de uma seção."],
      ["h4", "Título de nível intermediário."],
      ["h5", "Título de nível baixo."],
      ["h6", "Título de menor hierarquia."],
      ["p", "Parágrafo de texto."],
      ["a", "Link para outra página, âncora ou recurso."],
      ["ul", "Lista não ordenada."],
      ["ol", "Lista ordenada."],
      ["li", "Item de uma lista."],
      ["dl", "Lista de definições."],
      ["dt", "Termo em uma lista de definições."],
      ["dd", "Descrição do termo."],
      ["strong", "Texto com forte importância."],
      ["em", "Texto com ênfase."],
      ["mark", "Texto destacado ou referenciado."],
      ["small", "Texto secundário: avisos, copyright."],
      ["time", "Data ou hora legível por máquina."],
      ["address", "Informações de contato."],
      ["blockquote", "Citação longa de outra fonte."],
      ["cite", "Título de obra citada."],
      ["code", "Trecho de código inline."],
      ["pre", "Bloco de texto pré-formatado."],
      ["br", "Quebra de linha."],
      ["hr", "Separador temático entre seções."],
      ["details", "Widget expansível com conteúdo extra."],
      ["summary", "Título clicável de um details."],
      ["dialog", "Caixa de diálogo ou modal."],
    ],
    formulario: [
      ["form", "Formulário para envio de dados."],
      ["label", "Rótulo de um campo de formulário."],
      ["input", "Campo de entrada: texto, email, senha, etc."],
      ["textarea", "Campo de texto multilinha."],
      ["select", "Lista suspensa de opções."],
      ["option", "Opção dentro de um select."],
      ["button", "Botão clicável para ação ou envio."],
      ["fieldset", "Agrupa campos relacionados no formulário."],
      ["legend", "Título de um fieldset."],
      ["datalist", "Lista de sugestões para um input."],
      ["output", "Resultado de um cálculo ou formulário."],
    ],
    midia: [
      ["img", "Imagem incorporada na página."],
      ["picture", "Imagem responsiva com múltiplas fontes."],
      ["source", "Fonte de mídia para picture, audio ou video."],
      ["figure", "Conteúdo ilustrativo com legenda opcional."],
      ["figcaption", "Legenda de uma figure."],
      ["video", "Reprodutor de vídeo."],
      ["audio", "Reprodutor de áudio."],
      ["iframe", "Frame inline para embed de outra página."],
      ["canvas", "Área para gráficos via JavaScript."],
      ["svg", "Gráficos vetoriais inline."],
      ["table", "Tabela de dados."],
      ["thead", "Cabeçalho da tabela."],
      ["tbody", "Corpo da tabela."],
      ["tfoot", "Rodapé da tabela."],
      ["tr", "Linha da tabela."],
      ["th", "Célula de cabeçalho."],
      ["td", "Célula de dados."],
      ["caption", "Título da tabela."],
    ],
  };

  Object.entries(groups).forEach(([id, tags]) => {
    const container = document.querySelector(`#${id} .h-tags`);
    if (!container) return;

    tags.forEach(([tag, text]) => {
      const item = document.createElement("div");
      item.className = "h-tag";
      item.dataset.tag = tag;

      const paragraph = document.createElement("p");
      paragraph.textContent = text;

      item.append(paragraph);
      container.append(item);
    });
  });
})();
