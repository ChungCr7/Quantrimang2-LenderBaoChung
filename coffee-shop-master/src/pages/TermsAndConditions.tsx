import { Link } from 'react-router-dom';
import PageContainer from '@/components/shared/docs-page/PageContainer';
import DocTitle1 from '@/components/shared/docs-page/DocTitle1';
import DocTitle2 from '@/components/shared/docs-page/DocTitle2';
import DocTitle3 from '@/components/shared/docs-page/DocTitle3';

export default function TermsAndConditions() {
  return (
    <PageContainer>
      <DocTitle1>Điều Khoản và Điều Kiện Sử Dụng</DocTitle1>

      <DocTitle2>1. Chấp Nhận Điều Khoản</DocTitle2>
      <p>
        Khi sử dụng ứng dụng Coffee Shop, bạn đồng ý tuân thủ mọi điều khoản
        được nêu trong trang này. Nếu bạn không đồng ý với bất kỳ nội dung nào,
        vui lòng ngừng sử dụng ứng dụng.
      </p>

      <DocTitle2>2. Mục Đích Sử Dụng Ứng Dụng</DocTitle2>
      <p>
        Ứng dụng được xây dựng phục vụ mục đích học tập, thử nghiệm kỹ thuật
        (React – Spring Boot – JWT – CI/CD – Docker – AWS) và trình bày trong
        báo cáo đồ án. Ứng dụng không được sử dụng cho hoạt động thương mại
        thực tế.
      </p>

      <DocTitle2>3. Tài Khoản Người Dùng</DocTitle2>
      <p>
        Khi đăng ký hoặc đăng nhập bằng Google, bạn chịu trách nhiệm bảo mật
        thông tin tài khoản của mình. Mọi hành động được thực hiện dưới tài
        khoản của bạn đều là trách nhiệm của bạn.
      </p>

      <DocTitle2>4. Chính Sách Quyền Riêng Tư</DocTitle2>
      <p>
        Việc sử dụng ứng dụng đồng thời tuân theo{' '}
        <Link to="/privacy-policy" className="underline text-primary">
          Chính Sách Bảo Mật
        </Link>
        . Vui lòng xem lại để hiểu rõ cách chúng tôi thu thập và bảo vệ dữ liệu.
      </p>

      <DocTitle2>5. Giới Hạn Trách Nhiệm</DocTitle2>
      <p>
        Chúng tôi không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp,
        gián tiếp, vô tình hay phát sinh nào liên quan đến việc sử dụng ứng
        dụng — vì đây là sản phẩm học tập và thử nghiệm, không phải dịch vụ
        kinh doanh thực tế.
      </p>

      <DocTitle2>6. Thay Đổi Điều Khoản</DocTitle2>
      <p>
        Chúng tôi có quyền cập nhật hoặc chỉnh sửa Điều Khoản này bất cứ lúc
        nào. Các thay đổi sẽ có hiệu lực ngay lập tức khi được đăng tải trên
        trang này.
      </p>

      <DocTitle2>7. Hình Ảnh & Nội Dung Sử Dụng</DocTitle2>
      <p>
        Một số hình ảnh minh họa trong ứng dụng được lấy từ các nguồn miễn phí
        như Flaticon và các thư viện mở để phục vụ demo UI.
      </p>

      <DocTitle3>Hình ảnh từ Flaticon:</DocTitle3>
      <p>
        Các biểu tượng UI thuộc bản quyền Flaticon và được sử dụng theo giấy phép
        của họ. Chúng tôi không sở hữu bản quyền hình ảnh.
      </p>

      <DocTitle3>Hình ảnh mẫu sản phẩm:</DocTitle3>
      <p>
        Một số hình ảnh chỉ mang tính demo và không đại diện cho sản phẩm thực
        tế. Mục đích là để minh họa giao diện trong đồ án.
      </p>

      <DocTitle2>8. Quyền Sở Hữu Trí Tuệ</DocTitle2>
      <p>
        Mã nguồn ứng dụng được phát triển bởi Phạm Bảo Chung cho mục đích học
        tập và nghiên cứu. Các logo, hình ảnh và nội dung khác thuộc về chủ sở
        hữu tương ứng. Việc sao chép hoặc sử dụng ngoài phạm vi học tập cần được
        sự cho phép.
      </p>

      <DocTitle2>9. Liên Hệ</DocTitle2>
      <p>
        Nếu bạn có câu hỏi liên quan đến Điều Khoản Sử Dụng, vui lòng liên hệ:
      </p>
      <p>
        Email hỗ trợ:{' '}
        <a
          href="mailto:baochungas3@gmail.com"
          className="text-primary underline"
        >
          baochungas3@gmail.com
        </a>
      </p>

      <p className="mt-4">
        Điều khoản được cập nhật lần cuối vào{' '}
        <strong>30 Tháng 11, 2025</strong>.
      </p>
    </PageContainer>
  );
}
