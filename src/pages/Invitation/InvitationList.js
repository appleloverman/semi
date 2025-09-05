// src/components/InvitationList.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormatAll } from "./FormatAll";
import "../../Css/InvitationList.css";
import logoImage from "../../art/logo.png";
import PurchaseModal from "./PurchaseModal";
import { loadInvList, saveInvList } from "../../Util/invStore";

const InvitationList = () => {
  // 최초 진입 시 로컬스토리지에서만 로드 (필요 시 fallback 넣어도 됨)
  const [invData, setInvData] = useState(() =>
    loadInvList([
      // 필요하면 여기에 초기 seed 데이터(배열) 넣기
      // { ino: 1, date:"2025-09-01", time:"12:00", groomName:"홍길동", brideName:"김영희", bg:"#FFFFFF", title1:"소중한 분들을 초대합니다", content:"..." }
    ])
  );

  const [open, setOpen] = useState(false);

  // 샘플 상품(구매 모달용)
  const product = {
    id: "threeOrganic-mobile-01",
    title: "ThreeOrganic 모바일 청첩장",
    price: 69000,
    salePrice: 49000,
    shippingFee: 0,
    image:
      "https://d38fyys32noduv.cloudfront.net/commons/card_sample/XiWvmigDIO.png",
  };

  const designImages = {
    classic:
      "https://d38fyys32noduv.cloudfront.net/commons/card_sample/XiWvmigDIO.png",
    blush:
      "https://d38fyys32noduv.cloudfront.net/commons/card_sample/BgIftGNgps.png",
    minimal:
      "https://d38fyys32noduv.cloudfront.net/commons/card_sample/dXHF8IHgPT.png",
    modern:
      "https://d38fyys32noduv.cloudfront.net/commons/card_sample/IhMIUxYKKt.png",
  };

  const onDelete = (ino) => {
    setInvData((list) => {
      const next = (list || []).filter((i) => i.ino !== ino);
      saveInvList(next);
      return next;
    });
  };

  if (!Array.isArray(invData) || invData.length === 0) {
    return (
      <div className="wl-page">
        <div className="wl-empty">
          <h2>아직 청첩장이 없어요</h2>
          <p>
            첫 카드를 만들어보세요. 예식 정보와 커버 이미지를 넣으면 자동으로
            예쁘게 구성돼요.
          </p>
          <Link to="/InvitationAdd" className="wl-btn wl-btn--primary">
            새 카드 만들기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wl-page">
      <div className="wl-grid">
        {invData.map((i) => {
          const f = FormatAll(i.date, i.time);
          const bg = i.bg || "#ffffff";
          return (
            <article
              key={i.ino}
              className="wl-card"
              style={{ backgroundColor: bg }}
            >
              <div className="wl-ribbon">
                <span>{f.dateSlash}</span>
              </div>

              <div className="wl-cover wl-cover--pattern" aria-hidden="true">
                <img
                  src={logoImage}
                  alt="THREE ORGANIC 로고"
                  className="wl-logo-in-card"
                />
              </div>

              <h1 className="wl-names">
                <span className="wl-name">{i.groomName}</span>
                <span className="wl-amp">&</span>
                <span className="wl-name">{i.brideName}</span>
              </h1>

              <div className="wl-meta">
                <div className="wl-dot" />
                <span className="wl-datetime">{f.koDateTimeFull}</span>
                <div className="wl-dot" />
              </div>

              <section className="wl-intro">
                <p className="wl-tag">INVITATION</p>
                {i.title1 && <h2 className="wl-title">{i.title1}</h2>}
                {i.content && <p className="wl-body">{i.content}</p>}
              </section>

              <footer className="wl-actions">
                <Link
                  to={`/InvitationEdit/${i.ino}`}
                  className="wl-btn wl-btn--primary"
                >
                  편집하기
                </Link>
                <button
                  type="button"
                  className="wl-btn wl-btn--ghost"
                  onClick={() => onDelete(i.ino)}
                >
                  삭제하기
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className="wl-btn wl-btn--accent"
                >
                  구매하기
                </button>
              </footer>
            </article>
          );
        })}
      </div>

      <div className="wl-add-container">
        <Link
          to="/InvitationAdd"
          className="wl-btn wl-btn--primary wl-btn--large"
        >
          청첩장 추가하기
        </Link>
      </div>

      <PurchaseModal
        open={open}
        onClose={() => setOpen(false)}
        product={product}
        designImages={designImages}
      />
    </div>
  );
};

export default InvitationList;
