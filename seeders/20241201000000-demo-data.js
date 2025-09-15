"use strict";

const { QueryInterface, DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    // 상품 데이터 시딩
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "아이폰 14",
          description:
            "거의 새것 같은 아이폰 14입니다. 케이스와 액정보호필름이 적용되어 있습니다.",
          price: 800000,
          tags: JSON.stringify(["전자제품", "스마트폰", "애플"]),
          images: JSON.stringify([
            "https://via.placeholder.com/300x200?text=iPhone14",
          ]),
          favoriteCount: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "맥북 프로",
          description:
            "M2 칩이 탑재된 맥북 프로입니다. 개발용으로 사용했으며 상태가 매우 좋습니다.",
          price: 1500000,
          tags: JSON.stringify(["전자제품", "노트북", "애플"]),
          images: JSON.stringify([
            "https://via.placeholder.com/300x200?text=MacBook",
          ]),
          favoriteCount: 23,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "나이키 운동화",
          description:
            "에어맥스 270 운동화입니다. 몇 번만 신었고 깨끗한 상태입니다.",
          price: 120000,
          tags: JSON.stringify(["의류", "운동화", "나이키"]),
          images: JSON.stringify([
            "https://via.placeholder.com/300x200?text=Nike",
          ]),
          favoriteCount: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "게이밍 의자",
          description:
            "컴퓨터 작업용 게이밍 의자입니다. 등받이 조절 가능하고 편안합니다.",
          price: 200000,
          tags: JSON.stringify(["가구", "의자", "게이밍"]),
          images: JSON.stringify([
            "https://via.placeholder.com/300x200?text=GamingChair",
          ]),
          favoriteCount: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "무선 이어폰",
          description:
            "에어팟 프로 2세대입니다. 노이즈 캔슬링 기능이 뛰어납니다.",
          price: 250000,
          tags: JSON.stringify(["전자제품", "이어폰", "무선"]),
          images: JSON.stringify([
            "https://via.placeholder.com/300x200?text=AirPods",
          ]),
          favoriteCount: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // 게시글 데이터 시딩
    await queryInterface.bulkInsert(
      "Articles",
      [
        {
          title: "판다마켓 이용 후기",
          content:
            "판다마켓에서 여러 상품을 거래해봤는데 정말 만족스럽습니다. 안전한 거래가 가능하고 가격도 합리적이에요. 앞으로도 자주 이용할 예정입니다!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "중고거래 시 주의사항",
          content:
            "중고거래를 할 때 꼭 확인해야 할 것들을 정리해봤습니다. 1. 상품 상태 확인 2. 거래 전 연락처 확인 3. 안전한 거래 장소 선택 4. 거래 완료 후 후기 작성",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "스마트폰 구매 팁",
          content:
            "중고 스마트폰을 구매할 때 체크해야 할 항목들을 알려드립니다. 배터리 상태, 화면 상태, 카메라 기능, 소프트웨어 업데이트 여부 등을 꼼꼼히 확인하세요.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "가격 협상 꿀팁",
          content:
            "중고거래에서 가격을 협상할 때 유용한 팁들을 공유합니다. 시장가 조사, 상품 상태 고려, 정중한 어조 사용 등이 중요합니다.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "판다마켓 커뮤니티",
          content:
            "판다마켓을 이용하는 분들과 소통할 수 있는 공간입니다. 거래 후기, 상품 추천, 궁금한 점 등을 자유롭게 나눠보세요!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // 댓글 데이터 시딩 (상품 댓글)
    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          content: "정말 좋은 상품이네요! 가격도 합리적이고요.",
          productId: 1,
          articleId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "배송은 언제쯤 가능한가요?",
          productId: 1,
          articleId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "직거래 가능한 지역이 어디인가요?",
          productId: 2,
          articleId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "상품 상태가 정말 좋네요. 구매 희망합니다!",
          productId: 3,
          articleId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // 댓글 데이터 시딩 (게시글 댓글)
    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          content:
            "저도 판다마켓 정말 좋아해요! 안전한 거래가 가능해서 마음에 듭니다.",
          productId: null,
          articleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "좋은 정보 감사합니다. 다음 거래 때 참고하겠어요.",
          productId: null,
          articleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "스마트폰 구매할 때 정말 중요한 팁들이네요. 감사합니다!",
          productId: null,
          articleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "가격 협상 팁 정말 유용해요. 다음에 시도해보겠습니다.",
          productId: null,
          articleId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // 데이터 삭제 (역순으로)
    await queryInterface.bulkDelete("Comments", null, {});
    await queryInterface.bulkDelete("Articles", null, {});
    await queryInterface.bulkDelete("products", null, {});
  },
};
