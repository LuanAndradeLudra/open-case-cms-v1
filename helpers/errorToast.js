module.exports = function errorToast(text) {
  this.$toast.open({
    message: text,
    type: "error",
    position: "top-right",
    duration: 4000,
  });
};
