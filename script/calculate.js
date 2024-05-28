const tampilan = document.getElementById("input");

      const angka = document.querySelectorAll(".nomor").forEach(function (item) {
        item.addEventListener("click", function (e) {
          if (tampilan.innerText === "NaN") {
            tampilan.innerText = "";
          }
          if (tampilan.innerText === "0") {
            tampilan.innerText = "";
          }
          tampilan.innerText += e.target.innerHTML.trim();
        });
      });

      const hitung = document.querySelectorAll(".non-nomor").forEach(function (item) {
        item.addEventListener("click", function (e) {
          console.log(e.target.innerHTML);

          let angkaBelakang = tampilan.innerText.substring(tampilan.innerText.length, tampilan.innerText.length - 1);

          if (!isNaN(angkaBelakang) && e.target.innerHTML === "=") {
            tampilan.innerText = eval(tampilan.innerText);
          } else if (e.target.innerHTML === "AC") {
            tampilan.innerText = 0;
          } else if (!isNaN(angkaBelakang)) {
            tampilan.innerText += e.target.innerHTML;
          }
        });
      });
    