$(document).ready(()=>{
    let arrQA = new ArrQA();
    const renderUI = async () =>{
        $.getJSON('./../data/Data.json')
        .done((res) => {
            renderQA(res);
        })
        .fail((err) =>{
            console.log('err', err);
        })

    };
const renderQA = (nav) =>{
    let navContent = "";
    let tabContent = "";
    nav.navPills.forEach((item, index)=>{
        let navActive ;
        navActive = index === 0 ? "active" : "";
        navContent += `<li class="nav-item">
        <a class="nav-link btn-default ${navActive}"
        data-toggle="pill"
        href="#${item.tabName}">
        ${item.showName}
        </a>
        </li>`;
        let tabActive = "";
        tabActive = index === 0 ? "active show" : "";
        tabContent += `<div class="tab-pane container fade ${tabActive}" id=${item.tabName}>
        <div class="row"> ${renderTab(item.tabName, nav.tabPanes)}</div>
        </div>`;
    });
    $(".nav-pills").html(navContent);
    $(".tab-content").html(tabContent);
    danhSachQuanAo();
}
   const renderTab = (tabName, tabPanes) =>{
    switch(tabName){
      case "tabTopClothes":
        return renderItems(getItems("topclothes", tabPanes));
      case "tabBotClothes":
        return renderItems(getItems("botclothes", tabPanes));
      case "tabShoes":
        return renderItems(getItems("shoes", tabPanes));
      case "tabHandBags":
        return renderItems(getItems("handbags", tabPanes));
      case "tabNecklaces":
        return renderItems(getItems("necklaces", tabPanes));
      case "tabHairStyle":
        return renderItems(getItems("hairstyle", tabPanes));
      default:
        return renderItems(getItems("background", tabPanes));
    } };
  const getItems = (type, tabPanes) =>{
    const arrItems = tabPanes.filter((item)=>{
        if(item.type === type){
            return item
        }
    });
    return arrItems ;
  };
  const renderItems = (arrItems) =>{
    let tabPaneContent = arrItems.map((item)=>`
    <div class="col-md-3">
        <div class="card text-center">
          <img src="${item.imgSrc_jpg}" />
          <h4><b>${item.name}</b></h4>
          <button 
            class="changeStyle" 
            data-id="${item.id}" 
            data-type="${item.type}" 
            data-name="${item.name}" 
            data-desc="${item.desc}" 
            data-img-src-jpg="${item.imgSrc_jpg}" 
            data-img-src-png="${item.imgSrc_png}"
            style="
              display: inline-block;
              font-size: 16px;
              text-align: center;
              text-decoration: none;
              color: white;
              background: gray;
              border: none;
              width: 180px;
              height: 40px;
              font-weight: bold;
              cursor: pointer;
              border-radius: 5px;
              padding: 10px 20px;
              transition: background-color 0.3s ease;
              for
          "
        >
          Đổi Đồ
        </button>
        
        </div>
      </div>
    `).join("");
    return tabPaneContent };
const danhSachQuanAo = () =>{
    $(".changeStyle").click(function(){
      const id = $(this).data("id");
      const type = $(this).data("type");
      const name = $(this).data("name");
      const desc = $(this).data("desc");
      const imgsrc_jpg = $(this).data("img-src-jpg");
      const imgsrc_png = $(this).data("img-src-png");
      const dsqa = new DSQA(
        id,
        type,
        name,
        desc,
        imgsrc_jpg,
        imgsrc_png
      );
      if(arrQA.arr.length > 0){
        for(let i in arrQA.arr){
            if(arrQA.arr[i].type === dsqa.type){
                arrQA.arr.splice(i, 1);
                break; 
            }
        }
      }
      arrQA.addAddItem(dsqa);
      renderModel(arrQA.arr);
    })
};
const renderModel = (arrItems) => {
    for (let item of arrItems) {
      switch (item.type) {
        case "topclothes":
          renderBikiniTop(item.imgsrc_png);
          break;
        case "botclothes":
          renderBikiniBottom(item.imgsrc_png);
          break;
        case "shoes":
          renderFeet(item.imgsrc_png);
          break;
        case "handbags":
          renderHandbags(item.imgsrc_png);
          break;
        case "necklaces":
          renderNecklace(item.imgsrc_png);
          break;
        case "hairstyle":
          renderHairstyle(item.imgsrc_png);
          break;
        default:
          renderBackground(item.imgsrc_png);
      }
    }
  };
  function renderBikiniTop(img) {
    $(".bikinitop").css({
      width: "500px",
      height: "500px",
      background: `url(${img})`,
      position: "absolute",
      top: "-9%",
      left: "-5%",
      zIndex: "3",
      transform: "scale(0.5)",
    });
  }

  function renderBikiniBottom(img) {
    $(".bikinibottom").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      top: "-30%",
      left: "-5%",
      zIndex: "2",
      transform: "scale(0.5)",
    });
  }

  function renderFeet(img) {
    $(".feet").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-37%",
      right: "-3.5%",
      transform: "scale(0.5)",
      zIndex: "1",
    });
  }

  function renderHandbags(img) {
    $(".handbag").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-40%",
      right: "-3.5%",
      transform: "scale(0.5)",
      zIndex: "4",
    });
  }

  function renderNecklace(img) {
    $(".necklace").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-40%",
      right: "-3.5%",
      transform: "scale(0.5)",
      zIndex: "4",
    });
  }

  function renderHairstyle(img) {
    $(".hairstyle").css({
      width: "1000px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      top: "-75%",
      right: "-57%",
      transform: "scale(0.15)",
      zIndex: "4",
    });
  }

  function renderBackground(img) {
    $(".background").css({
      backgroundImage: `url(${img})`,
    });
  }

  renderUI();
})