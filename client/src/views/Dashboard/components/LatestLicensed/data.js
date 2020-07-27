import uuid from "uuid/v1";
import moment from "moment";

export default [
  {
    Id: uuid(),
    Name: "Dropbox",
    Description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.",
    LogoImage: "/images/products/product_1.png",
    InfoURL: "http://google.co.kr",
    DownloadURL: "http://google.co.kr",
    UpdateDate: moment().format("YYYY[-]MM[-]DD"),
    CreateDate: moment().format("YYYY[-]MM[-]DD")
  },
  {
    Id: uuid(),
    Name: "Medium Corporation",
    Description:
      "Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.",
    LogoImage: "/images/products/product_2.png",
    InfoURL: "http://google.co.kr",
    DownloadURL: "http://google.co.kr",
    UpdateDate: moment().format("YYYY[-]MM[-]DD"),
    CreateDate: moment().format("YYYY[-]MM[-]DD")
  },
  {
    Id: uuid(),
    Name: "Slack",
    Description:
      "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.",
    LogoImage: "/images/products/product_3.png",
    InfoURL: "http://google.co.kr",
    DownloadURL: "http://google.co.kr",
    UpdateDate: moment().format("YYYY[-]MM[-]DD"),
    CreateDate: moment().format("YYYY[-]MM[-]DD")
  },
  {
    Id: uuid(),
    Name: "Lyft",
    Description:
      "Lyft is an on-demand transportation company based in San Francisco, California.",
    LogoImage: "/images/products/product_4.png",
    InfoURL: "http://google.co.kr",
    DownloadURL: "http://google.co.kr",
    UpdateDate: moment().format("YYYY[-]MM[-]DD"),
    CreateDate: moment().format("YYYY[-]MM[-]DD")
  },
  {
    Id: uuid(),
    Name: "GitHub",
    Description:
      "GitHub is a web-based hosting service for version control of code using Git.",
    LogoImage: "/images/products/product_5.png",
    InfoURL: "http://google.co.kr",
    DownloadURL: "http://google.co.kr",
    UpdateDate: moment().format("YYYY[-]MM[-]DD"),
    CreateDate: moment().format("YYYY[-]MM[-]DD")
  },
  {
    Id: uuid(),
    Name: "Squarespace",
    Description:
      "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
    LogoImage: "/images/products/product_6.png",
    InfoURL: "http://google.co.kr",
    DownloadURL: "http://google.co.kr",
    UpdateDate: moment().format("YYYY[-]MM[-]DD"),
    CreateDate: moment().format("YYYY[-]MM[-]DD")
  }
];
