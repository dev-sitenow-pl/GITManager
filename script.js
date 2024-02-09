const startInfoSection = document.querySelector('#start');
const bodyElement = document.querySelector('body');

const readyToWork = () => {
  bodyElement.classList.add('ready');
  startInfoSection.classList.add('ready');
};

const gitManagerContent = document.getElementById('content_gitm');

class HTMLPureBuilder {
  createTag(name, className) {
    const tag = document.createElement(name);
    if (className) { tag.className = className };
    return tag;
  }
  appendChild(parent, child) {
    parent.appendChild(child);
  }
}

class CategoryBuilder extends HTMLPureBuilder {
  buildSectionDiv(categoryName) {
    const section = this.createTag('section', 'gitm__category');
    const header = this.createTag('h2', 'gitm__category-title');
    header.textContent = categoryName;

    this.appendChild(section, header);

    return section;
  }
}

class ArticleBuilder extends HTMLPureBuilder {

  buildArticleDiv(commandData) {
    const article = this.createTag('article', 'gitm__row');

    const divDescription = this.createTag('div', 'gitm__desc');
    divDescription.textContent = commandData.description;

    const divCode = this.createTag('div', 'gitm__desc__code');
    const code = this.createTag('code');
    code.textContent = commandData.command;

    this.appendChild(article, divDescription);
    this.appendChild(divDescription, divCode);
    this.appendChild(divCode, code);

    return article;
  }
}

class ButtonBuilder extends HTMLPureBuilder {
  buildButton(buttonText, clickHandler) {
    const button = this.createTag('button');
    button.innerText = buttonText;
    button.addEventListener('click', clickHandler);
    return button;
  }
}

class ContentLoader {
  constructor(data, categoryBuilder, articleBuilder, buttonBuilder) {
    this.data = data;
    this.categoryBuilder = categoryBuilder;
    this.articleBuilder = articleBuilder;
    this.buttonBuilder = buttonBuilder;
  }

  async handleButtonClick(event, commandData) {
    try {
      await navigator.clipboard.writeText(commandData);
      const originalText = event.target.innerText;
      event.target.innerText = lang.buttonCopy;
      event.target.classList.add('press');
      setTimeout(() => {
        event.target.innerText = originalText;
        event.target.classList.remove('press');
      }, 1000);
    } catch (err) {
      console.error('Nie udało się skopiować do schowka: ', err);
    }
  }

  loadData() {
    const categoryElements = [];

    this.data.forEach(categoryData => {
      const section = this.categoryBuilder.buildSectionDiv(categoryData.category);

      categoryData.commands.forEach(commandData => {
        const article = this.articleBuilder.buildArticleDiv(commandData);

        const button = this.buttonBuilder.buildButton(
          lang.button,
          (event) => this.handleButtonClick(event, commandData.command)
        );

        const divButton = this.articleBuilder.createTag('div', 'gitm__btn');

        this.categoryBuilder.appendChild(article, divButton);
        this.categoryBuilder.appendChild(divButton, button);
        this.categoryBuilder.appendChild(section, article);

      })

      categoryElements.push(section);
    });

    return categoryElements;
  }
}

if (gitManagerContent) {
  const categoryBuilder = new CategoryBuilder();
  const articleBuilder = new ArticleBuilder();
  const buttonBuilder = new ButtonBuilder();

  const contentLoaderData = new ContentLoader(commandsData, categoryBuilder, articleBuilder, buttonBuilder);

  const categoryElements = contentLoaderData.loadData();

  categoryElements.forEach(section => {
    gitManagerContent.appendChild(section);
  });
  setTimeout(() => {
    readyToWork();
  }, 1000);
} else {
  console.error('Element o id "content_gitm" nie został znaleziony.');
}
