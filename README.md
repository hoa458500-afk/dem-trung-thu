# Một chút Trung Thu gửi bà

Bản code đầy đủ để mở và chỉnh sửa trong VS Code. Đã kèm hình ảnh và nhạc nền mới nhất.

## Mở và chạy

1. Giải nén `trung-thu-vscode-code-cakes.zip`.
2. Trong VS Code, chọn **File → Open Folder…** và mở thư mục **trung-thu-vscode** vừa giải nén.
3. Trong thư mục đó trên máy tính, nhấp đúp **index.html** để mở trang bằng trình duyệt.
4. Nhấn **CHẠM ĐỂ MỞ** để vào ba lồng đèn. Nhạc tự phát nếu trình duyệt cho phép; nếu bị chặn, lần chạm mở quà sẽ khởi động nhạc. Không còn nút bật/tắt riêng.
5. Trong quà thứ ba, mở đủ ba lời chúc rồi nhấn **Ngắm trăng một chút** để xem cảnh ngắm trăng từ hiên nhà gỗ, có lồng đèn treo và một chiếc đèn ngôi sao nằm trên sàn hiên; không có người hoặc lời nhắn che ảnh.
6. Khi sửa code, nhấn **Ctrl + S**, rồi tải lại trang trong trình duyệt để xem thay đổi.

Màn chọn ba lồng đèn có nền **Bến trăng** vẽ bằng code: trời xanh đêm, trăng vàng, mây trôi nhẹ, núi xa và mặt hồ phản chiếu ánh trăng. Đom đóm sáng dịu quanh bờ hồ. Nền tự thích ứng với khung dọc, dừng chuyển động khi mở một phần quà và hỗ trợ chế độ giảm chuyển động.

Ba lồng đèn chọn quà được vẽ hoàn toàn bằng **SVG và CSS**, theo mẫu đầu lân đỏ, trăng tròn có thỏ và thỏ ôm bánh. Giấy đèn dùng gradient vàng ấm, viền sáng và quầng sáng nhịp nhẹ. Dây treo chuyển động cùng thân đèn. Chuyển động chỉ dùng CSS và tạm dừng khi rời màn chọn quà hoặc ẩn tab; không thêm vòng lặp JavaScript. Các ảnh đèn cũ được giữ trong `assets/` nhưng màn chọn quà không còn dùng chúng.

Quà 2 có tiếng nổ trầm và tiếng lách tách đồng bộ với từng chùm pháo hoa. Khoảng 5 giây sau khi vào, một quả pháo hoa tỏa thành chữ **TRUNG THU / VUI VẺ** bằng những hạt sáng vàng. Chữ giữ vài giây, tản xuống rồi biến mất; pháo hoa thường tiếp tục tự bắn. Màn chữ xuất hiện đúng một lần mỗi lần mở quà 2. Chạm bầu trời để bắn thêm khi màn chữ đã kết thúc. Âm thanh được tạo bằng Web Audio, không cần tải thêm tệp tiếng nổ.

Quà 1 có nút **Thả lồng đèn**: mỗi lần bấm sẽ thả một đợt lồng đèn bay lên từ dưới đáy màn hình. Mới vào quà 1 sẽ chưa có lồng đèn; muốn thả thêm thì bấm nút lần nữa. Mưa sao băng vẫn hiện trên bầu trời.

Quà 3 có nền căn nhà màu đỏ vẽ bằng SVG và JavaScript: khung gỗ, cửa sổ tròn nhìn ra trăng và hai lồng đèn đung đưa. Chạm vào một chiếc bánh sẽ có vòng sáng vàng, cánh sáng nhỏ và vệt sáng lướt qua bánh, rồi lời chúc cuộn dọc xuống. Chạm lại để thu lời chúc. Khi bật chế độ giảm chuyển động trên thiết bị, lời chúc xuất hiện ngay.



Bố cục dành cho điện thoại dựng đứng. Trên máy tính, trang hiển thị trong một khung dọc ở giữa; trên điện thoại dựng đứng, khung phủ vừa màn hình.

Đây là website HTML/CSS/JavaScript thuần, chạy trực tiếp bằng các tệp đã có. Không cần cài npm hay chạy bước build.

## Các tệp chính

| Tệp/thư mục | Nội dung |
| --- | --- |
| `index.html` | Trang khởi đầu, tiêu đề và liên kết tới các tệp code. |
| `style.css` | Màu sắc, bố cục, cửa mở đầu, lồng đèn và dải lời chúc. |
| `backgrounds.js` | Nền SVG Bến trăng ở màn chọn lồng đèn và nền nhà đỏ của quà 3. |
| `home-lanterns.js` | Ba lồng đèn đầu lân, trăng có thỏ và thỏ ôm bánh, vẽ bằng SVG. |
| `mooncakes.js` | Ba chiếc bánh Trung Thu SVG; vòng sáng và các hạt sáng nhỏ khi chạm vào bánh. |
| `firework-effects.js` | Màn pháo hoa tạo chữ, tiếng nổ và tiếng lách tách; giới hạn số âm thanh phát cùng lúc. |
| `script.js` | Ba phần quà, cảnh ngắm trăng cuối, pháo hoa, sao băng, chuyển cảnh và nhạc tự phát. |
| `assets/` | Toàn bộ hình ảnh và tệp nhạc nền. |
| `tools/create_midautumn_music.py` | Mã tạo lại bản nhạc không lời; tùy chọn, không cần chạy để sử dụng website. |

## Chỉnh nhanh

- **Lời chúc:** tìm `const cakeWishes` trong `script.js`.
- **Nền màn chọn lồng đèn:** hàm `moonlitLanding` trong `backgrounds.js`; các chuyển động `homeMoonGlow`, `homeCloudDrift`, `homeFirefly` nằm cuối `style.css`.
- **Ba lồng đèn chọn quà:** các hàm `lion`, `moon`, `rabbit` trong `home-lanterns.js`; bố cục và ánh sáng ở khối `Reference-inspired paper lanterns` cuối `style.css`. Giữ các nút `data-scene` trong `script.js` để mở đúng phần quà.
- **Nhạc nền:** tìm `new Audio(` trong `script.js`, rồi đổi đường dẫn sang tệp nhạc bạn đặt trong `assets/`.
- **Âm lượng nhạc:** tìm `applyMusicMood` trong `script.js`; mặc định `0.55`, giảm còn `0.34` khi ngắm trăng. Giá trị nằm từ `0` đến `1`.
- **Chữ pháo hoa:** hàm `makeGreetingParticles` trong `firework-effects.js`; dấu hỏi trên chữ Ẻ được vẽ riêng để rõ trên mọi phông dự phòng. Tốc độ mở chữ và tan chữ nằm trong `createGreeting`.
- **Tiếng nổ:** hàm `playExplosion` trong `firework-effects.js`; `master.gain.value` chỉnh âm lượng. Tiếng nổ dừng khi rời quà 2 hoặc chuyển sang tab khác.
- **Nền quà 1 và 2:** màu `.wish-scene,.fireworks-scene` cuối `style.css`; các hiệu ứng nằm trong `script.js`. Các hàm `lanternSky` và `fireworksLake` trong `backgrounds.js` là bản nền dự phòng, hiện không bật.
- **Nền quà 3:** hàm `reunionHouse` trong `backgrounds.js`.
- **Lồng đèn đung đưa:** tìm `codedLanternSway` trong `style.css`.
- **Hiệu ứng bánh:** hàm `flourish` trong `mooncakes.js` và các tên bắt đầu bằng `cakeOrbit`, `cakeMote` trong `style.css`.
- **Ảnh gia đình:** tìm `family-illustration` trong `script.js`.
- **Ảnh ngắm trăng:** `assets/moon-porch-star-v19.webp`; bố cục và chuyển động nằm ở phần `.moon-finale` trong `style.css`.

Giữ nguyên tên và vị trí các tệp trong `assets/` để hình và nhạc hoạt động. Phông chữ Google cần kết nối mạng; khi ngoại tuyến, trang dùng phông chữ có sẵn trên máy.

Nếu muốn tạo lại nhạc từ mã Python, cần Python, NumPy, SciPy và FFmpeg, rồi chạy `python tools/create_midautumn_music.py`. Tệp MP3 hoàn chỉnh đã có sẵn trong `assets/`.

## Trang đang chia sẻ

https://mot-chut-trung-thu-gui-ba-2026.hoanguyen22.chatgpt.site

Bản trên máy tính là bản riêng. Sửa trong VS Code không tự cập nhật trang đang chia sẻ hoặc nội dung mở từ mã QR cũ.
