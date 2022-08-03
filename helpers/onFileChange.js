module.exports = function onFileChange(e) {
  if (
    e.target.files[0] &&
    (e.target.files[0].type === "image/png")
  ) {
    if (e.target.files[0].size > 4 * 1024 * 1024) {
      this.imageUrl = "";
      this.errorToast("A imagem escolhida é muito grande!");
    } else {
      this.weapon.image = e.target.files[0];
      this.imageUrl = URL.createObjectURL(e.target.files[0]);
    }
  }
};
