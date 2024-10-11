import React from 'react';
import BlogCard from '../components/blogpagecomponent/BlogCard';
import '../styles/Blog.css';

const BlogPage = () => {
  const blogs = [
    {
      title: 'Những Loài Hoa Tuyệt Vời Cho Ngày Cưới Của Bạn',
      description: 'Khám phá những loài hoa hàng đầu giúp đám cưới của bạn trở nên khó quên.',
      content: `
        Ngày cưới là sự kiện quan trọng, vì vậy chọn hoa phải thật đặc biệt. 
        Hoa hồng đỏ là biểu tượng của tình yêu và đam mê, trong khi hoa lan trắng biểu hiện cho sự tinh khiết và sang trọng. 
        Một số hoa cưới phổ biến khác bao gồm hoa mẫu đơn, cẩm tú cầu, và baby trắng, giúp tạo nên một không gian lãng mạn và trang nhã. 
        Ngoài ra, bạn nên phối hợp màu sắc của hoa với tông màu chủ đạo của đám cưới để tạo ra sự hài hòa và ấn tượng cho khách mời.
      `
    },
    {
      title: 'Chăm Sóc Hoa Hồng: Mẹo & Bí Quyết',
      description: 'Roses are timeless, but they need proper care. Learn how to keep them fresh and vibrant.',
      content: `
        Hoa hồng là loài hoa yêu thích của nhiều người nhờ vẻ đẹp quyến rũ và mùi hương thơm ngát. 
        Để hoa hồng luôn tươi và nở rực rỡ, bạn cần chú ý đến các yếu tố như nước tưới, ánh sáng và dinh dưỡng. 
        Khi cắt hoa, hãy cắt gốc theo góc 45 độ và ngâm chúng vào nước ngay lập tức. 
        Định kỳ cắt bỏ các bông hoa đã tàn để cây tập trung dinh dưỡng nuôi những nụ hoa mới. 
        Ngoài ra, bổ sung phân bón có chứa kali và phốt-pho để cây ra nhiều hoa hơn.
      `
    },
    {
      title: 'Top 5 Loài Hoa Mùa Hè Giúp Ngôi Nhà Thêm Rực Rỡ',
      description: 'Tìm hiểu những loài hoa mùa hè sẽ mang lại vẻ đẹp và hương thơm cho ngôi nhà của bạn.',
      content: `
        Mùa hè là thời điểm lý tưởng để trồng những loài hoa rực rỡ mang lại vẻ đẹp và sức sống cho không gian sống của bạn. 
        Dưới đây là top 5 loài hoa không thể bỏ qua:
        1. **Hoa hướng dương**: Với màu vàng rực rỡ và kích thước lớn, hoa hướng dương mang lại cảm giác ấm áp và hạnh phúc.
        2. **Hoa oải hương**: Không chỉ đẹp, oải hương còn mang lại mùi hương thơm nhẹ nhàng giúp xua tan căng thẳng.
        3. **Hoa dạ yến thảo**: Với nhiều màu sắc từ hồng, đỏ đến tím, dạ yến thảo là lựa chọn tuyệt vời cho các chậu hoa ban công.
        4. **Hoa cúc vạn thọ**: Dễ chăm sóc, hoa cúc vạn thọ chịu nhiệt tốt, giúp ngôi nhà bạn luôn bừng sáng.
        5. **Hoa thiên điểu**: Với hình dáng độc đáo như những chú chim thiên đường, hoa thiên điểu sẽ là điểm nhấn lạ mắt trong vườn nhà.
      `
    },
    {
      title: 'Cách Cắm Hoa Như Một Chuyên Gia',
      description: 'Nắm vững nghệ thuật cắm hoa với những mẹo từ các chuyên gia.',
      content: `
        Cắm hoa là nghệ thuật đòi hỏi sự tinh tế và sáng tạo. Dưới đây là một số mẹo nhỏ giúp bạn cắm hoa như một chuyên gia:
        - **Chọn bình hoa phù hợp**: Bình hoa nên có chiều cao tương ứng với chiều dài của hoa. Đừng chọn bình quá lớn hoặc quá nhỏ so với kích thước bó hoa.
        - **Cắt hoa đúng cách**: Trước khi cắm, bạn nên cắt gốc hoa theo góc 45 độ để hoa hút nước tốt hơn.
        - **Tạo lớp nền**: Bắt đầu cắm những bông hoa lớn ở giữa, sau đó dùng các bông nhỏ hơn để tạo độ phủ và thêm lá xanh để làm nền.
        - **Phối hợp màu sắc**: Sử dụng những tông màu tương phản hoặc bổ sung lẫn nhau để tạo sự cân bằng và nổi bật cho bó hoa.
        - **Bảo quản hoa**: Sau khi cắm xong, hãy đảm bảo rằng nước trong bình luôn sạch và thay nước thường xuyên để hoa tươi lâu hơn.
      `
    },
    {
      title: 'Tầm Quan Trọng Của Việc Chọn Hoa Địa Phương',
      description: 'Chọn hoa địa phương không chỉ thân thiện với môi trường mà còn giúp hoa tươi lâu hơn.',
      content: `
        Việc chọn hoa địa phương không chỉ giúp giảm thiểu khí thải carbon do quá trình vận chuyển từ nơi xa mà còn giúp bạn có những bó hoa tươi và đẹp hơn. 
        Các loài hoa địa phương thường được thu hoạch gần nơi sử dụng, do đó chúng tươi lâu hơn và có chất lượng cao hơn. 
        Hơn nữa, việc chọn hoa địa phương là cách tuyệt vời để ủng hộ nền kinh tế địa phương, giúp người nông dân có thêm thu nhập và duy trì nghề trồng hoa truyền thống.
      `
    },
    {
      title: 'Xu Hướng Hoa Trang Trí Sự Kiện Mới Nhất',
      description: 'Khám phá những xu hướng hoa mới nhất trong các sự kiện và lễ cưới hiện đại.',
      content: `
        Các sự kiện lớn như đám cưới, tiệc sinh nhật hay lễ kỷ niệm đều cần đến những trang trí hoa tinh tế và hiện đại. 
        Xu hướng hoa hiện nay tập trung vào phong cách tối giản nhưng vẫn sang trọng:
        - **Hoa đơn sắc**: Sử dụng một màu hoa chủ đạo như trắng, vàng, hoặc hồng để tạo nên sự thanh lịch và tinh tế.
        - **Cắm hoa tự nhiên**: Phong cách cắm hoa theo cách tự nhiên, không đối xứng đang được ưa chuộng vì mang lại vẻ đẹp phóng khoáng và thoải mái.
        - **Hoa treo**: Các thiết kế hoa treo từ trần hoặc trên bàn tiệc đang trở thành xu hướng mới, giúp không gian sự kiện thêm phần độc đáo và sáng tạo.
        - **Sử dụng hoa dại**: Hoa dại, tuy nhỏ bé nhưng khi được phối hợp một cách khéo léo sẽ tạo ra vẻ đẹp tinh tế và gần gũi với thiên nhiên.
      `
    },
    {
      title: 'Cách Bảo Quản Hoa Tươi Lâu',
      description: 'Mẹo nhỏ giúp bạn bảo quản hoa lâu tàn, luôn tươi tắn và đẹp mắt.',
      content: `
        Để bảo quản hoa tươi lâu, hãy tuân theo một số mẹo đơn giản sau:
        1. **Cắt gốc hoa**: Cắt gốc hoa khoảng 1-2 cm dưới nước để ngăn không khí vào thân cây.
        2. **Thay nước thường xuyên**: Nước trong bình cần được thay mỗi 2-3 ngày để ngăn ngừa vi khuẩn phát triển.
        3. **Sử dụng chất bảo quản hoa**: Có thể thêm một ít đường hoặc nước chanh vào nước để cung cấp dưỡng chất cho hoa.
        4. **Giữ hoa ở nơi mát mẻ**: Tránh để hoa tiếp xúc trực tiếp với ánh sáng mặt trời và đặt chúng ở nơi có nhiệt độ mát mẻ.
        5. **Cắt tỉa lá thừa**: Loại bỏ các lá nằm dưới mực nước để tránh lá bị phân hủy và gây ra mùi hôi.
      `
    },
    {
      title: 'Ý Nghĩa Các Loài Hoa Trong Ngày Lễ Tình Nhân',
      description: 'Tìm hiểu ý nghĩa của những loài hoa phổ biến được tặng trong ngày Valentine.',
      content: `
        Trong ngày lễ tình nhân, mỗi loài hoa đều mang một thông điệp riêng:
        - **Hoa hồng đỏ**: Biểu tượng của tình yêu nồng nàn và đam mê, không thể thiếu trong ngày Valentine.
        - **Hoa tulip**: Đại diện cho sự hoàn hảo và tình yêu chân thành.
        - **Hoa cẩm chướng**: Thường được tặng để thể hiện tình yêu nhẹ nhàng và tinh tế.
        - **Hoa lan**: Mang ý nghĩa của sự thanh lịch và vẻ đẹp thuần khiết.
        - **Hoa baby**: Đại diện cho sự trong sáng và ngây thơ trong tình yêu.
      `
    },
    {
      title: 'Chọn Hoa Cho Dịp Tân Gia Nhà Mới',
      description: 'Những loài hoa nào phù hợp để tặng trong dịp tân gia? Hãy cùng khám phá.',
      content: `
        Dịp tân gia là thời điểm để chúc mừng và mong cầu may mắn cho gia chủ. Dưới đây là một số gợi ý cho những loài hoa nên tặng trong dịp này:
        - **Hoa lan**: Biểu tượng của sự giàu có và thịnh vượng, hoa lan là món quà hoàn hảo để tặng trong dịp tân gia.
        - **Hoa đồng tiền**: Mang ý nghĩa may mắn, tiền tài và thành công.
        - **Hoa cúc**: Biểu tượng của sự trường thọ và hạnh phúc, thích hợp để chúc mừng gia chủ có một cuộc sống lâu dài và bình an.
        - **Hoa mai**: Đặc trưng của sự phú quý, hoa mai là lựa chọn tuyệt vời để chúc gia chủ giàu sang, thịnh vượng.
      `
    },
    {
      title: 'Tự Làm Lọ Hoa Handmade Đơn Giản Tại Nhà',
      description: 'Hướng dẫn tự làm lọ hoa handmade từ những vật liệu đơn giản.',
      content: `
        Bạn có thể tự tay làm lọ hoa handmade đơn giản từ những vật liệu có sẵn trong nhà:
        - **Lọ hoa từ chai thủy tinh cũ**: Sử dụng chai thủy tinh đã qua sử dụng, làm sạch và trang trí bằng dây thừng hoặc sơn màu để tạo ra một chiếc lọ hoa xinh xắn.
        - **Lọ hoa từ hộp thiếc**: Hộp thiếc cũ có thể biến thành lọ hoa phong cách vintage bằng cách sơn lại hoặc dán các hình ảnh hoa văn.
        - **Lọ hoa từ cốc sứ**: Những chiếc cốc sứ cũ có thể tái chế thành lọ hoa nhỏ gọn và đáng yêu, phù hợp với không gian bàn làm việc hoặc bàn ăn.
        - **Trang trí bằng ruy băng**: Thêm một dải ruy băng quanh lọ hoa sẽ tạo nên điểm nhấn tinh tế và đẹp mắt.
      `
    }
  ];

  return (
    <div className="blog-page">
      <h1>Our Latest Blog Posts</h1>
      <div className="blog-list">
        {blogs.map((blog, index) => (
          <div key={index} className="blog">
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
