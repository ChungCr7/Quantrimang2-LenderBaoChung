import PageContainer from '@/components/shared/docs-page/PageContainer';
import DocTitle1 from '@/components/shared/docs-page/DocTitle1';
import DocTitle2 from '@/components/shared/docs-page/DocTitle2';
import DocTitle3 from '@/components/shared/docs-page/DocTitle3';

export default function PrivacyPolicyPage() {
  return (
    <PageContainer>
      <DocTitle1>Chính Sách Bảo Mật</DocTitle1>
      <p>
        Chính Sách Bảo Mật này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ
        thông tin cá nhân của người dùng trong quá trình sử dụng ứng dụng thương mại 
        điện tử Coffee Shop. Ứng dụng được xây dựng phục vụ mục đích học tập, 
        báo cáo đồ án và thử nghiệm kỹ thuật DevOps – không dùng cho mục đích thương mại.
        Chúng tôi cam kết bảo mật thông tin người dùng một cách an toàn và minh bạch.
      </p>

      <DocTitle2>Thông Tin Chúng Tôi Thu Thập</DocTitle2>

      <DocTitle3>Đăng nhập bằng tài khoản Google:</DocTitle3>
      <p>
        Ứng dụng hỗ trợ đăng nhập bằng Google. Khi sử dụng tính năng này, chúng tôi chỉ 
        nhận các thông tin cơ bản như tên và email của bạn để phục vụ cho việc xác thực.
      </p>

      <DocTitle3>Lưu trữ LocalStorage:</DocTitle3>
      <p>
        Thông tin phiên đăng nhập (token và thông tin tài khoản) được lưu trong 
        localStorage của trình duyệt để duy trì trạng thái đăng nhập của bạn. 
        Ứng dụng không thu thập hoặc lưu trữ dữ liệu này trên máy chủ ngoài mục đích xác thực.
      </p>

      <DocTitle2>Mục Đích Sử Dụng Dữ Liệu</DocTitle2>
      <p>
        Dữ liệu thu thập được sử dụng để:
      </p>
      <ul className="list-disc pl-6">
        <li>Xác thực tài khoản và duy trì phiên đăng nhập</li>
        <li>Hiển thị thông tin cá nhân trong trang hồ sơ</li>
        <li>Cải thiện trải nghiệm người dùng trong ứng dụng</li>
      </ul>

      <DocTitle2>Bảo Mật Dữ Liệu</DocTitle2>
      <p>
        Chúng tôi áp dụng các biện pháp bảo mật phù hợp (JWT Token, HTTPS, bảo mật máy chủ)
        nhằm đảm bảo thông tin cá nhân của bạn được giữ an toàn.  
        Tuy nhiên, bạn cần lưu ý rằng không có hệ thống nào an toàn tuyệt đối 100%.
      </p>

      <DocTitle2>Thời Gian Lưu Trữ và Xóa Dữ Liệu</DocTitle2>
      <p>
        Dữ liệu của bạn chỉ tồn tại trong localStorage trên thiết bị và sẽ được xoá khi:
      </p>
      <ul className="list-disc pl-6">
        <li>Bạn thực hiện đăng xuất</li>
        <li>Bạn xoá dữ liệu trình duyệt</li>
        <li>Ứng dụng được gỡ cài đặt (đối với bản mobile PWA)</li>
      </ul>
      <p>
        Chúng tôi không lưu trữ dữ liệu người dùng sau khi kết thúc quá trình thử nghiệm.
      </p>

      <DocTitle2>Bên Thứ Ba</DocTitle2>
      <p>
        Ứng dụng chỉ sử dụng dịch vụ đăng nhập Google (OAuth2).  
        Bạn có thể xem thêm tài liệu của Google tại:{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          className="text-primary underline"
        >
          Chính sách bảo mật của Google
        </a>.
      </p>

      <DocTitle2>Cập Nhật Chính Sách</DocTitle2>
      <p>
        Chúng tôi có thể cập nhật Chính Sách Bảo Mật trong tương lai khi ứng dụng 
        được nâng cấp hoặc mở rộng. Bất kỳ thay đổi nào sẽ có hiệu lực ngay khi 
        được đăng tải trên trang này.
      </p>

      <DocTitle2>Liên Hệ</DocTitle2>
      <p>
        Nếu bạn có bất kỳ thắc mắc nào liên quan đến Chính Sách Bảo Mật, vui lòng
        liên hệ qua email hỗ trợ:{" "}
        <a
          href="mailto:baochungas3@gmail.com"
          className="text-primary underline"
        >
          baochungas3@gmail.com
        </a>
        .
      </p>

      <p>
        Chính sách được cập nhật lần cuối vào:{" "}
        <strong>2 Tháng 12, 2025</strong>.
      </p>
    </PageContainer>
  );
}
