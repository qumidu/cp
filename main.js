let courses = [
  {
    courseID: `COURSE001`,
    courseAvatar: `https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDI%3D`,
    courseName: `Digital Marketing`,
    coursePriceShow: `10.000 VND`,
    coursePrice: 10000,
  },
  {
    courseID: `COURSE002`,
    courseAvatar: `https://images.unsplash.com/photo-1607706009771-de8808640bcf?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    courseName: `Lập Trình JavaScript`,
    coursePriceShow: `20.000 VND`,
    coursePrice: 20000,
  },
  {
    courseID: `COURSE003`,
    courseAvatar: `https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    courseName: `Lập Trình Ruby`,
    coursePriceShow: `50.000 VND`,
    coursePrice: 50000,
  },
];
let MY_BANK = {
  BANK_ID: `MB`,
  ACCOUNT_NO: `67899678910`,
};
document.addEventListener(`DOMContentLoaded`, () => {
  const courseInner = document.querySelector(`.courses_inner`);
  let coursesRenderUI = ``;
  courses.forEach((item, index) => {
    coursesRenderUI += `
    <div class="course_item">
    <img src=${item.courseAvatar}
    >
    <p>${item.courseName}</p>
    <p>${item.coursePriceShow}</p>
    <a class="course_item_btn">Mua</a>
    </div>
    `;
  });
  courseInner.innerHTML = coursesRenderUI;

  // ========================================

  const btns = document.querySelectorAll(`.course_item_btn`);
  const paid_content = document.getElementById(`paid_content`);
  const paid_price = document.getElementById(`paid_price`);
  const course_qr_img = document.querySelector(`.course_qr_img`);
  btns.forEach((item, index) => {
    item.addEventListener(`click`, () => {
      const paidContent = `${courses[index].courseID}`;
      const paidPrice = courses[index].coursePrice;
      let QR = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-compact2.png?amount=${paidPrice}&addInfo=${paidContent}}`;
      course_qr_img.src = QR;
      paid_content.innerHTML = paidContent;
      paid_price.innerHTML = `${courses[index].coursePriceShow}`;

      setTimeout(() => {
        setInterval(() => {
          checkPaid(paidPrice, paidContent);
        }, 1000);
      }, 20000);
    });
  });
});
let isSuccess = false;
async function checkPaid(price, content) {
  if (isSuccess) {
    return;
  } else {
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbz75hn7FEx_WeQ2XNlBvRHQr9W4hMo_oOHWr1p6PQ11dqYsXlzI9HX0T8Qd2Au7Ezg6/exec`
      );
      const data = await response.json();
      const lastPaid = data.data[data.data.length - 1];
      lastPrice = lastPaid[`Giá trị`];
      lastContent = lastPaid[`Mô tả`];
      if (lastPrice >= price && lastContent.includes(content)) {
        alert(`Thanh toán thành công`);
        isSuccess = true;
      } else {
        console.log(`Không thành công`);
      }
    } catch {
      console.error(`Lỗi`);
    }
  }
}

// const API_KEY =
//   "AK_CS.59f803a058ac11ef9477cf31e322e4f8.ELvQG7L7zbPOG8ytOKvGedjEpT5LCXqzP1SBS8XSygs8x4D6O0Z7fLDPnCQhebGs5LqJd9zd";
// const API_GET_PAID = "https://oauth.casso.vn/v2/transactions";

// async function checkPaid() {
//   const response = await fetch(API_GET_PAID, {
//     header: {
//       Authorization: "apikey ${API_KEY}",
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.json();
//   console.log(data);
// }
// checkPaid();
