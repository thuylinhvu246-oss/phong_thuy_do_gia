// Nội dung 4 trang dịch vụ (lấy nguyên văn từ file "Content product page - ...").
// Sửa nội dung ở đây rồi chạy: node scripts/build-pages.mjs

export const PAGES = {
  'ngay-gio-sinh': {
    title: 'Chọn ngày giờ sinh theo Bát Tự',
    seoTitle: 'Chọn ngày giờ sinh theo Bát Tự cho bé | Phong Thủy Đỗ Gia',
    description:
      'Dịch vụ chọn ngày giờ sinh theo Bát Tự: loại bỏ ngày giờ xấu, chọn ngày hợp tuổi bố mẹ và cân bằng Ngũ hành trong phạm vi bác sĩ cho phép. Kết quả trong 2-3 ngày.',
    intro: [
      'Phong Thủy Đỗ Gia chọn Ngày giờ sinh theo Bát Tự bằng việc phân tích các khung giờ (trong phạm vi dự sinh) dựa trên nhiều tiêu chí để chọn ra những thời điểm tốt cho việc sinh nở.',
    ],
    note: 'Lưu ý: việc lựa chọn thời điểm sinh luôn cần đặt yếu tố an toàn của mẹ và bé lên hàng đầu và chỉ thực hiện trong phạm vi được bác sĩ chuyên môn cho phép.',
    sections: [
      {
        id: 'phuong-phap', eyebrow: 'Phương pháp', h2: 'Phương pháp xem ngày giờ sinh tại Đỗ Gia', type: 'steps', cols: 2,
        items: [
          { h: 'Tiếp nhận thông tin', p: 'Khách hàng cung cấp ngày tháng năm sinh của bố mẹ & ngày dự sinh, giới tính em bé. Phong Thủy Đỗ Gia sẽ chọn ngày giờ tốt theo gói dịch vụ khách hàng chọn trong khoảng 7-10 ngày trước dự sinh.' },
          { h: 'Loại bỏ ngày giờ xấu', p: 'Phong Thủy Đỗ Gia sẽ giúp ba mẹ loại những ngày giờ xấu cho việc sinh nở và xấu cho em bé, bao gồm: Ngày Nguyệt Phá, Ngày Kim Thần Thất Sát, Ngày Hung Bại, Ngày Dương Công Kị Nhật... Giờ Dạ Đề, Giờ Tướng Quân, Giờ Quan Sát, Giờ Kim Xà Thiết Tỏa…' },
          { h: 'Chọn ngày hợp tuổi bố mẹ', p: 'Chọn ngày là thiên lộc, quý nhân, hợp tuổi bố mẹ. Giúp cuộc sống gia đình thêm may mắn, hạnh phúc, mối quan hệ giữa các thành viên hài hòa, gắn bó.' },
          { h: 'Chọn ngày giờ sinh đẹp theo Bát Tự', p: 'Nếu chỉ chọn ngày đẹp theo lịch thông thường mà không xem cấu trúc Lá số Bát Tự, rất dễ rơi vào trường hợp mất cân bằng ngũ hành, khuyết sao quan trọng hoặc hình xung mạnh gây bất lợi cho cuộc sống sau này.' },
        ],
      },
      {
        id: 'phu-hop', eyebrow: 'Đối tượng', h2: 'Dịch vụ chọn ngày giờ sinh theo Bát Tự phù hợp với ai?', type: 'fit', alt: true,
        items: [
          'Cha mẹ chuẩn bị sinh con và có dự định sinh mổ chủ động.',
          'Cha mẹ đang dự định có em bé bằng phương pháp thụ tinh nhân tạo (IVF).',
          'Cha mẹ muốn tham khảo Bát Tự trước khi đưa ra quyết định về thời điểm có em bé (tự nhiên).',
        ],
      },
      {
        id: 'hoi-dap', eyebrow: 'Hỏi đáp', h2: 'Câu hỏi thường gặp', type: 'faq',
        items: [
          { q: 'Có thể chọn ngày giờ sinh bất kỳ không?', a: ['Không. Việc lựa chọn phải nằm trong khoảng thời gian được bác sĩ xác nhận là có thể thực hiện. Đỗ Gia không đưa ra chỉ định y khoa hoặc khuyến nghị thay đổi lịch sinh trái với chỉ định của bác sĩ.'] },
          { q: 'Bao lâu thì có kết quả xem ngày giờ sinh theo Bát Tự?', a: ['Khách hàng sẽ nhận được kết quả xem ngày giờ sinh trong vòng 2-3 ngày kể từ khi xác nhận và thanh toán.'] },
          { q: 'Chọn ngày giờ sinh có phải chỉ cần chọn “giờ đẹp” không?', a: ['Không. Mỗi khung giờ đều có điểm tốt xấu riêng. Một giờ được coi là “đẹp” theo một tiêu chí riêng chưa phản ánh toàn bộ cấu trúc Bát Tự. Muốn chọn ngày giờ sinh theo Bát Tự cần xét nhiều tiêu chí.'] },
          {
            q: 'Những ngày giờ xấu cần tránh khi sinh là những giờ nào?',
            defs: [
              { t: 'Giờ Dạ Đề', d: ['Trẻ sinh phạm giờ Dạ Đề thường hay bị trì trệ khí huyết, gây mệt mỏi, dễ vật vã kêu khóc nhiều, khó ngủ, đặc biệt về ban đêm. Gây ảnh hưởng không nhỏ tới sức khỏe và tinh thần của trẻ nhỏ cũng như người thân.'] },
              { t: 'Giờ Tướng Quân', d: ['Trẻ phạm giờ này, khi nhỏ thường hay khóc nhiều, khóc dài không nín, khi lớn dù mặt mũi hiền lành nhưng tính khí lại bướng bỉnh, nghịch ngợm.'] },
              { t: 'Giờ Quan Sát', d: ['Nếu trẻ sinh phạm giờ Quan Sát lúc nhỏ thường ốm yếu khó nuôi. Nếu mệnh của cha mẹ mà lại khắc con thì càng đáng lo ngại. Thường chức năng gan không tốt.', 'Qua giai đoạn nguy hiểm, khi lớn lên thì khôn ngoan, thông minh nhưng thường bướng bỉnh, khó bảo, ngỗ ngược...'] },
              { t: 'Giờ Diêm Vương', d: ['Trẻ sinh phạm giờ Diêm Vương dễ có biểu hiện như hay giật mình, sợ hãi, ngủ không yên, thần kinh yếu, dễ bị co giật chân tay, thần kinh bất ổn, yếu vía.'] },
              { t: 'Giờ Kim Xà Thiết Tỏa', d: ['Giờ Kim Xà – Thiết Tỏa là giờ sinh phạm nặng nhất trong 5 loại. Trẻ khó nuôi, sức khỏe yếu, hay đau ốm, dễ gặp hạn lúc nhỏ (đặc biệt là mốc dưới 12, 13 tuổi). Nếu bản mệnh bị cha mẹ khắc thì càng khó.'] },
            ],
          },
        ],
      },
    ],
    regTitle: 'Đăng ký tư vấn chọn ngày giờ sinh',
  },

  'dat-ten': {
    title: 'Đặt tên theo Bát Tự',
    seoTitle: 'Đặt tên cho con theo Bát Tự & Việt Danh Học | Phong Thủy Đỗ Gia',
    description:
      'Dịch vụ đặt tên theo Bát Tự: xác định Dụng Thần từ ngày giờ sinh, kết hợp Việt Danh Học để chọn 5 bộ tên có quẻ số đẹp, ý nghĩa hài hòa cho bé.',
    intro: [
      'Phong Thủy Đỗ Gia kết hợp Bát Tự và Việt Danh Học để đưa ra những cái tên hài hòa giữa Dụng Thần và quẻ số.',
      'Bát Tự giúp xác định Ngũ hành Dụng Thần của lá số. Trong khi đó, Việt Danh Học cung cấp thêm một lớp phân tích về quẻ số và ý nghĩa của tên.',
      'Việc kết hợp hai phương pháp giúp quá trình đặt tên không chỉ phù hợp với Bát Tự mà còn chú trọng đến ý nghĩa và cấu trúc của chính cái tên.',
    ],
    sections: [
      {
        id: 'phuong-phap', eyebrow: 'Phương pháp', h2: 'Phương pháp đặt tên tại Đỗ Gia', type: 'steps', cols: 3,
        items: [
          { h: 'Tiếp nhận thông tin', p: 'Khách hàng gửi thông tin gồm:', list: ['Năm/ tháng/ ngày/ giờ sinh chính xác của người cần đặt tên.', 'Họ của người bố', 'Tên gia đình mong muốn', 'Tên cần tránh'] },
          { h: 'Xác định Dụng Thần cho Bát Tự gốc', p: 'Phong Thủy Đỗ Gia sẽ lập lá số Bát Tự dựa trên năm tháng ngày giờ sinh, phân tích độ vượng suy ngũ hành trong mệnh cục gốc để tìm Dụng thần của lá số.' },
          { h: 'Chọn danh sách tên phù hợp', p: 'Sau khi đã xác định được ngũ hành Dụng Thần, Phong Thủy Đỗ Gia sẽ hoàn thiện 5 bộ tên phù hợp nhất có cục số mang ý nghĩa đẹp theo Bát Tự và Việt danh học để gia đình lựa chọn.' },
        ],
      },
      {
        id: 'hoi-dap', eyebrow: 'Hỏi đáp', h2: 'Câu hỏi thường gặp', type: 'faq', alt: true,
        items: [
          { q: 'Dụng thần trong Bát Tự là gì?', a: [
            'Dụng Thần là một trong những yếu tố quan trọng khi phân tích và điều chỉnh mệnh cục trong Bát Tự. Dụng Thần được xác định dựa trên tổng thể cấu trúc lá số và sự vượng suy của Ngũ hành.',
            'Mỗi Bát Tự có một cấu trúc khác nhau. Vì vậy, việc xác định Dụng Thần cần dựa trên chính Năm - Tháng - Ngày - Giờ sinh của từng người.',
            'Trong dịch vụ đặt tên, Đỗ Gia sử dụng Ngũ hành của Dụng Thần làm một trong những cơ sở quan trọng để lựa chọn tên phù hợp với Bát Tự gốc.'] },
          { q: 'Đặt tên theo Mệnh năm sinh (Nạp Âm) được không?', a: [
            'Một cách hiểu phổ biến là dựa vào Mệnh Nạp Âm của năm sinh để lựa chọn Ngũ hành cho tên. Tuy nhiên, Nạp Âm không phản ánh đúng, đủ toàn bộ sự vượng suy của ngũ hành trong Bát Tự và cấu trúc của lá số.',
            'Khi đặt tên theo Bát Tự, Đỗ Gia phân tích toàn bộ Tứ Trụ, sự vượng suy của Ngũ hành và xác định Dụng Thần trước khi lựa chọn Ngũ hành phù hợp cho tên.',
            'Vì vậy, cùng sinh một năm nhưng hai người sẽ có Bát Tự khác nhau và không nhất thiết phù hợp với cùng một nhóm tên.'] },
          { q: 'Chưa sinh em bé có đặt tên theo Bát Tự được không?', a: [
            'Ngày dự sinh chưa thể xác định chính xác Bát Tự gốc, bởi thời điểm sinh thực tế có thể thay đổi. Để xác định Dụng Thần và lựa chọn tên dựa trên Bát Tự, Đỗ Gia cần đầy đủ Năm - Tháng - Ngày - Giờ sinh thực tế của em bé. Nếu gia đình đồng thời sử dụng dịch vụ <a href="/ngay-gio-sinh">Chọn ngày giờ sinh</a>, có thể đăng ký cả hai dịch vụ để nhận thêm ưu đãi.'] },
          { q: 'Gia đình có thể chọn tên yêu thích được không?', a: [
            'Gia đình hoàn toàn có thể gửi những tên hoặc nhóm tên mình yêu thích. Đỗ Gia có thể hỗ trợ phân tích những tên này dưới góc nhìn Việt Danh Học, từ đó giúp gia đình có thêm cơ sở để lựa chọn.'] },
        ],
      },
    ],
    regTitle: 'Đăng ký tư vấn đặt tên theo Bát Tự',
  },

  'dinh-huong-su-nghiep': {
    title: 'Định hướng công danh sự nghiệp',
    seoTitle: 'Định hướng công danh sự nghiệp theo Bát Tự | Phong Thủy Đỗ Gia',
    description:
      'Định hướng công danh sự nghiệp theo Bát Tự: nhận diện thế mạnh, môi trường và vai trò phù hợp, định hướng phát triển theo Đại vận và Lưu niên.',
    intro: [
      'Phong Thủy Đỗ Gia giúp khách hàng có thêm góc nhìn từ Bát Tự để nhận diện thế mạnh, môi trường phù hợp và định hướng con đường phát triển công danh, sự nghiệp bằng việc giúp bạn trả lời những câu hỏi:',
    ],
    questions: [
      'Bạn có năng lực, thế mạnh gì nổi bật?',
      'Bạn phù hợp với môi trường, vai trò làm việc nào?',
      'Bạn nên đi theo hướng ổn định hay kinh doanh trong thời gian tới?',
    ],
    introAfter: 'Đỗ Gia giúp bạn chuyển những thông tin trong lá số thành những thông tin có tính thực tiễn, ứng dụng thực tế về công danh và sự nghiệp để giúp bạn ra quyết định.',
    sections: [
      {
        id: 'phan-tich', eyebrow: 'Nội dung tư vấn', h2: 'Đỗ Gia phân tích những gì?', type: 'steps', cols: 3,
        items: [
          { h: 'Tố chất và đặc điểm nổi bật', p: 'Phân tích các yếu tố trong Bát Tự để nhận diện những đặc điểm có thể trở thành thế mạnh trong quá trình phát triển cũng như xu hướng phát triển công danh sự nghiệp.' },
          { h: 'Công danh và vai trò nghề nghiệp', p: 'Phân tích các yếu tố liên quan đến công việc, trách nhiệm, môi trường, vai trò và định hướng cách thức phát triển sự nghiệp.' },
          { h: 'Định hướng phát triển theo công danh sự nghiệp', p: 'Kết nối những đặc điểm trên thành một định hướng có tính ứng dụng theo Đại vận (10 năm) và Lưu niên (1 năm) để khách hàng có định hướng phát triển công danh sự nghiệp rõ ràng thay vì dừng lại ở việc mô tả đặc điểm, tố chất.' },
        ],
      },
      {
        id: 'phu-hop', eyebrow: 'Đối tượng', h2: 'Dịch vụ Định hướng công danh sự nghiệp theo Bát Tự phù hợp với ai?', type: 'fit', alt: true,
        items: [
          'Người đang đứng trước nhiều lựa chọn nghề nghiệp.',
          'Người muốn hiểu thêm về thế mạnh của bản thân trước khi thay đổi hướng đi, chuyển việc, chuyển ngành.',
          'Người muốn xác định nên tiếp tục đào sâu chuyên môn, hay chuyển sang hướng khác kinh doanh tự do.',
          'Cha mẹ đang định hướng cho con muốn có thêm một góc nhìn về tố chất và xu hướng phát triển của con trong tương lai.',
        ],
      },
      {
        id: 'hoi-dap', eyebrow: 'Hỏi đáp', h2: 'Câu hỏi thường gặp', type: 'faq',
        items: [
          { q: 'Bát Tự có thể xác định chính xác tôi phải làm nghề gì không?', a: ['Bát Tự có thể cung cấp một hệ thống tham khảo về tố chất, xu hướng. Việc lựa chọn nghề nghiệp cuối cùng vẫn phụ thuộc vào năng lực, sở thích, hoàn cảnh và quyết định của mỗi người.'] },
          { q: 'Tôi đang làm một nghề khác với nghề được luận thì sao?', a: ['Không nhất thiết phải thay đổi nghề. Nội dung tư vấn có thể được sử dụng để xem cách bạn đang phát triển công việc hiện tại, những thế mạnh nên khai thác và những hướng có thể mở rộng.'] },
          { q: 'Có nên xem cho trẻ em không?', a: ['Rất nên để biết được tố chất, thiên hướng của trẻ. Tuy nhiên, với trẻ nhỏ, mục tiêu nên là hiểu tố chất và tạo môi trường phát triển phù hợp, thay vì gắn trẻ với một nghề nghiệp cố định từ quá sớm.'] },
        ],
      },
    ],
    regTitle: 'Đăng ký tư vấn Định hướng công danh sự nghiệp',
  },

  'luan-la-so': {
    title: 'Luận giải lá số Bát Tự',
    seoTitle: 'Luận giải lá số Bát Tự chi tiết | Phong Thủy Đỗ Gia',
    description:
      'Luận giải lá số Bát Tự: phân tích Ngũ hành, Thập Thần, Cách cục, Thần Sát để hiểu rõ bản mệnh, công việc, tài chính, hôn nhân, con cái và vận trình từng giai đoạn.',
    intro: [
      'Phong Thủy Đỗ Gia sẽ giúp bạn có một bức tranh tổng thể về bản mệnh và các khía cạnh của cuộc sống (công việc, sự nghiệp, đầu tư, hôn nhân, con cái…) thông qua phân tích Ngũ hành, Thập Thần, Cách cục, Thần Sát… trong lá số Bát Tự. Từ đó giúp bạn hiểu rõ hơn về đặc điểm, cơ hội và vấn đề cần lưu tâm trong từng giai đoạn cuộc sống.',
    ],
    sections: [
      {
        id: 'phuong-phap', eyebrow: 'Phương pháp', h2: 'Phương pháp luận giải lá số Bát Tự của Phong Thủy Đỗ Gia', type: 'steps', cols: 3,
        items: [
          { h: 'Phân tích tổng quan', p: 'Xác định cấu trúc cơ bản của lá số và những yếu tố nổi bật. Đánh giá Nhật Chủ cùng các mối quan hệ giữa các Thiên Can, Địa Chi.' },
          { h: 'Phân tích Ngũ hành và vượng suy', p: 'Đánh giá sự phân bố và tương tác của Ngũ hành để xác định sự vượng suy của ngũ hành. Từ đó tìm ra Hỷ thần, Kỵ thần, Dụng thần - Những yếu tố cốt lõi giúp khách hàng cải vận.' },
          { h: 'Phân tích Thập Thần và các phương diện của cuộc sống', p: 'Xem xét, đánh giá các Thập Thần để luận các khía cạnh cụ thể: công việc, sự nghiệp, tài chính, đầu tư, hôn nhân, con cái…' },
        ],
      },
    ],
    regTitle: 'Đăng ký tư vấn Luận giải lá số Bát Tự',
  },
};
