commandsData.forEach(category => {
  category.commands.forEach(command => {
    const elemComand = new HTMLPureBuilder(command);
    // console.log(elemComand.render());
    gitmContent.appendChild(sectionWithDiv);
  });
});


console.log(commandsData[0].category);
console.log(commandsData[0].commands[1].description);
console.log(commandsData[0].commands[1].command);
console.log(commandsData[0].category);
console.log(commandsData[0].commands[0].description);
console.log(commandsData[0].commands[0].command);

class CommandDisplayComponent {
  constructor(command) {
    this.sectionElement = document.createElement('section');
    this.sectionElement.className = 'gitm';

    const rowElement = document.createElement('div');
    rowElement.className = 'gitm__row';

    const descriptionDivElement = document.createElement('div');
    descriptionDivElement.className = 'gitm__desc';
    const descriptionTextElement = document.createElement('p');
    descriptionTextElement.textContent = command.description;
    descriptionDivElement.appendChild(descriptionTextElement);

    const buttonDivElement = document.createElement('div');
    buttonDivElement.className = 'gitm__btn';
    const buttonTagElement = document.createElement('button');
    buttonTagElement.textContent = 'użyj';
    // Możliwe dodanie event listener'a dla buttonElement tutaj
    // buttonElement.addEventListener('click', () => { ... });
    buttonTagElement.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(command.command)
          .then(() => {
            alert('Komenda została skopiowana do schowka');
            // Tu możesz wyświetlić komunikat dla użytkownika o sukcesie
          })
          .catch(err => {
            alert('Błąd podczas kopiowania: ', err);
            // Tu możesz poinformować użytkownika o błędzie
          });
      } else {
        // Przypadki łaskawe dla przeglądarek bez wsparcia dla Clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = command.command;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          console.log('Komenda została skopiowana do schowka (metoda łaskawa)');
          // Tu możesz wyświetlić komunikat dla użytkownika o sukcesie
        } catch (err) {
          console.error('Błąd podczas kopiowania (metoda łaskawa): ', err);
          // Tu możesz poinformować użytkownika o błędzie
        }
        document.body.removeChild(textArea);
      }
    });
    buttonDivElement.appendChild(buttonTagElement);

    rowElement.appendChild(descriptionDivElement);
    rowElement.appendChild(buttonDivElement);

    this.sectionElement.appendChild(rowElement);
  }
  render() {
    return this.sectionElement;
  }
}

commandsData.forEach(category => {
  category.commands.forEach(command => {
    const elemComand = new CommandDisplayComponent(command);
    // console.log(elemComand.render());
    gitmContent.appendChild(elemComand.render());
  });
});





const template = document.getElementById('commandTemplate');

commandsData.forEach(category => {
  category.commands.forEach(command => {
    // Klonowanie szablonu i jego zawartości
    const clone = document.importNode(template.content, true);
    const descriptionText = clone.querySelector('.gitm__desc p');
    const buttonItem = clone.querySelector('.gitm__btn button');

    // Wstawianie danych
    descriptionText.textContent = command.description;
    buttonItem.textContent = command.command;
    buttonItem.addEventListener('click', () => {
      window.focus();
      if (!command.requiresInput) {
        console.log(command.command);
        navigator.clipboard.writeText(command.command)
          .then(() => {
            alert(`Skopiowano do schowka komendę: ${command.command}`);
          })
          .catch(err => {
            console.error('Nie udało się skopiować do schowka: ', err);
          });
      } else {
        const askQuestion = prompt('Podaj nazwę gałęzi (branch):');
        if (askQuestion) {
          const fullCommand = `${command.command}${askQuestion}`; // Uwaga: dodałem spację przed askQuestion dla lepszej czytelności
          console.log(fullCommand);
          navigator.clipboard.writeText(fullCommand)
            .then(() => {
              alert(`Skopiowano do schowka komendę: ${fullCommand}`);
            })
            .catch(err => {
              console.error('Nie udało się skopiować do schowka: ', err);
            });
        } else {
          alert('Operacja skopiowania anulowana lub nazwa gałęzi nie została podana.');
        }
      }
    });

    // Dodawanie klonu do struktury dokumentu
    gitmContent.appendChild(clone);
  });
});

class DataCommand {
  constructor(data) {
    this.description = data.description;
    this.command = data.command;
    this.queryText = data.queryText;
  }
}

class CommandNoInput extends DataCommand {
  viewDescription() {
    console.log(`${this.description}`);
  }
  viewCommand() {
    console.log(`-> ${this.command}`);
  }
  viewAllInfo() {
    console.log(`${this.description} -> ${this.command}`);
    return `${this.description} -> ${this.command}`;
  }
}

class CommandInput extends CommandNoInput {
  viewAllInfo() {
    const askQuestion = prompt(this.queryText);
    console.log(`${this.description} -> ${this.command}${askQuestion}`);
    return `${this.description} -> ${this.command}${askQuestion}`;
  }
}

commandsData.forEach(category => {
  category.commands.forEach(command => {
    // console.log(command.queryText);

    // if (command.queryText) {
    //   if (command.queryText.length > 0) {
    //     command.queryText.forEach(guery => {
    //       const elemComand = new CommandInput(command);
    //       gitmContent.innerHTML = elemComand.viewAllInfo();
    //     })
    //   }

    // } else {
    const elemComand = new CommandNoInput(command);
    gitmContent.innerHTML = elemComand.viewAllInfo();
    // }
  });
});