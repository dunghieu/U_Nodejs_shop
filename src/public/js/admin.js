const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector("[name='id']").value;
  const csrf = btn.parentNode.querySelector("[name='_csrf']").value;

  const productElement = btn.closest("article");

  fetch("/admin/product/" + prodId, {
    method: "DELETE",
    headers: {
      // "Content-Type": "application/json",
      "csrf-token": csrf,
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      productElement.parentNode.removeChild(productElement);
    })
    .catch((err) => {
      console.log(err);
    });
};
