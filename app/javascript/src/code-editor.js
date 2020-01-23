import AceEditor from './ace-editor';

class CodeEditor {
  constructor(element) {
    this.element = element
    this.filename = element.data('filename')
    this.config = element.data('config')

    this._setup();
  }

  _setup() {
    this.editor = new AceEditor(this.element, this.config, this.filename);

    this.editor.onSetup = () => {
      this.editor.setTheme('dark');

      if (localStorage.getItem('code-editor') !== null) {
        this.editor.setValue(
          localStorage.getItem('code-editor')
        );
      }

      this.onSetup(this);
    }


    this.editor.onChanged = () => {
      this.save();
    }
  }

  save() {
    localStorage.setItem('code-editor', this.editor.getValue());
  }

  setTheme(theme) {
    this.editor.setTheme(theme);
  }

  setKeybinding(keybinding) {
    this.editor.setKeybinding(keybinding);
  }

  exportFile() {
    return this.editor.exportFile();
  }

  focus() {
    this.editor.focus();
  }

  isFocused() {
    return this.editor.isFocused();
  }

  addCommand(opts) {
    this.editor.addCommand(opts);
  }
}

export default CodeEditor;
