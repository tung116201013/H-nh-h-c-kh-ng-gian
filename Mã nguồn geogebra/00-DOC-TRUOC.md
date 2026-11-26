# 00 - ĐỌC TRƯỚC: Tài nguyên GeoGebra phần hình học không gian (3D)

Nguồn: github.com/geogebra/geogebra (nhánh main), giấy phép mã nguồn EUPL v1.2. Mã gốc là Java, KHÔNG chạy trên web. Chỉ đọc để lấy ý tưởng thuật toán, viết lại bằng JavaScript, ghi chú nguồn GeoGebra, không sao chép nguyên văn.

## 1. Cách làm việc với các file này

1. Mở lần lượt từng file `01-...` đến `05-...` trong cùng thư mục. Mỗi file chứa nhiều file Java, mỗi file bắt đầu bằng dòng `### FILE: <đường dẫn>`.
2. Trước khi viết code, báo cáo trung thực file nào ĐỌC ĐƯỢC, file nào KHÔNG. Không đoán nội dung từ trí nhớ.
3. Khi cần tìm một thuật toán, tìm theo tên lớp (ví dụ `AlgoIntersectPlanes`) trong file `02-...`.
4. Tài nguyên đã bỏ bình luận, import và phần giao diện, chỉ giữ logic.

## 2. Các file trong thư mục

| File | Số file Java | Nội dung |
|---|---|---|
| 01-dieu-khien-cong-cu.md | 82 | Logic các công cụ 3D khi người dùng bấm chuột (EuclidianController3D), các lệnh 3D, khối đa diện đều, phép biến hình 3D |
| 02-thuat-toan-phan1.md | 148 | Toàn bộ thuật toán 3D (Algo*): dựng chóp/lăng trụ/nón/trụ/cầu, mặt phẳng, giao tuyến, thiết diện, khoảng cách, góc, đối xứng, quay |
| 02-thuat-toan-phan2.md | 53 | Toàn bộ thuật toán 3D (Algo*): dựng chóp/lăng trụ/nón/trụ/cầu, mặt phẳng, giao tuyến, thiết diện, khoảng cách, góc, đối xứng, quay |
| 03-doi-tuong-phan1.md | 30 | Các đối tượng hình học 3D (Geo*): điểm, đường, đoạn, mặt phẳng, đa giác, đa diện, mặt cầu/nón/trụ |
| 03-doi-tuong-phan2.md | 2 | Các đối tượng hình học 3D (Geo*): điểm, đường, đoạn, mặt phẳng, đa giác, đa diện, mặt cầu/nón/trụ |
| 04-toan-hoc-nen-tang.md | 31 | Toán nền: vector, hệ tọa độ, ma trận (Coords, CoordSys, CoordMatrix) và các lớp nền Geo/Algo phẳng |
| 05-ve-hinh-net-dut.md | 6 | Phần vẽ: đa diện, đa giác, đoạn thẳng, mặt phẳng, cách xử lý nét đứt/nét liền (Drawable3D...) |

## 3. Danh sách công cụ của khung nhìn 3D

Thanh công cụ mặc định 3D lấy từ `ToolBar.java` (DEFAULT_TOOLBAR_3D). Bảng dưới là các công cụ riêng của 3D hoặc có xử lý riêng ở 3D. Cột 'Hàm xử lý' là hàm trong `EuclidianController3D` (file 01). Cột 'Hàm Manager3D / lệnh / Algo' được trích TỰ ĐỘNG bằng cách tìm trong thân hàm nên có thể chưa đủ, cần đọc hàm để chắc chắn.

| Mã | Hằng số | Công cụ | Hàm xử lý | Manager3D | Lệnh | Algo gọi trực tiếp |
|---|---|---|---|---|---|---|
| 510 | MODE_PLANE_THREE_POINTS | Mặt phẳng qua 3 điểm | threePoints | - | - | - |
| 511 | MODE_PLANE | Mặt phẳng (chứa đường/đa giác) | planeContaining | plane3D | - | - |
| 512 | MODE_ORTHOGONAL_PLANE | Mặt phẳng vuông góc | orthogonalPlane | orthogonalPlane3D | - | - |
| 513 | MODE_PARALLEL_PLANE | Mặt phẳng song song | parallelPlane | plane3D | - | - |
| 514 | MODE_ORTHOGONAL_THREE_D | Đường vuông góc (3D) | - | - | - | - |
| 533 | MODE_PYRAMID | Hình chóp | pyramidOrPrism | prism, pyramid | - | - |
| 531 | MODE_PRISM | Hình lăng trụ | pyramidOrPrism | prism, pyramid | - | - |
| 534 | MODE_CONIFY | Nón từ đa giác (Conify) | extrusionOrConify | coneLimited, cylinderLimited, prism, pyramid | - | - |
| 532 | MODE_EXTRUSION | Đẩy khối (Extrusion) | extrusionOrConify | coneLimited, cylinderLimited, prism, pyramid | - | - |
| 522 | MODE_CONE_TWO_POINTS_RADIUS | Hình nón (2 điểm + bán kính) | coneTwoPointsRadius | - | - | - |
| 523 | MODE_CYLINDER_TWO_POINTS_RADIUS | Hình trụ (2 điểm + bán kính) | cylinderTwoPointsRadius | - | - | - |
| 537 | MODE_TETRAHEDRON | Tứ diện đều | archimedeanSolid | archimedeanSolid | - | AlgoDependentVector3D, AlgoUnitVector3D |
| 536 | MODE_CUBE | Hình lập phương | archimedeanSolid | archimedeanSolid | - | AlgoDependentVector3D, AlgoUnitVector3D |
| 535 | MODE_NET | Khai triển (Net) | polyhedronNet | polyhedronNet | - | - |
| 538 | MODE_SURFACE_OF_REVOLUTION | Mặt tròn xoay | surfaceOfRevolution | surfaceOfRevolution | - | - |
| 521 | MODE_SPHERE_TWO_POINTS | Mặt cầu qua 2 điểm | circleOrSphere2 | - | - | - |
| 520 | MODE_SPHERE_POINT_RADIUS | Mặt cầu (tâm + bán kính) | spherePointRadius | - | - | - |
| 560 | MODE_VOLUME | Thể tích | volume | - | - | - |
| 571 | MODE_MIRROR_AT_PLANE | Đối xứng qua mặt phẳng | mirrorAtPlane | mirror3D, plane3D | - | - |
| 570 | MODE_ROTATE_AROUND_LINE | Quay quanh đường thẳng | rotateAroundLine | rotate3D | - | - |
| 551 | MODE_CIRCLE_AXIS_POINT | Đường tròn (trục + điểm) | circleAxisPoint | circle3D | - | - |
| 550 | MODE_CIRCLE_POINT_RADIUS_DIRECTION | Đường tròn (tâm, bán kính, hướng) | circlePointRadiusDirection | - | - | - |
| 69 | MODE_INTERSECTION_CURVE | Giao tuyến hai mặt (Intersection curve) | intersectionCurve | corner, intersect, intersectAsCircle, intersectPath, intersectPlaneFunctionNVar, intersectPlaneImplicitSurface, intersectPlanes, intersectQuadricLimited, intersectRegion, intersectionPoint | - | - |
| 502 | MODE_VIEW_IN_FRONT_OF | Nhìn thẳng từ phía trước (View in front of) | viewInFrontOf | - | - | - |
| 540 | MODE_ROTATEVIEW | Xoay khung nhìn | - | - | - | - |

Ghi chú: công cụ 510 (mặt phẳng qua 3 điểm) và 521 (mặt cầu qua 2 điểm) dùng hàm `threePoints` và `circleOrSphere2` nằm ở lớp cha `EuclidianController` (không có trong gói này). Công cụ 514 (đường vuông góc 3D) cũng xử lý ở lớp cha. Công cụ 522, 523, 550, 560, 502 gọi thẳng các thuật toán bên trong hàm xử lý, hãy đọc thân hàm trong file 01.

Các công cụ chung 2D/3D còn lại trên thanh 3D (điểm, đoạn, tia, vector, đường song song, đa giác, đường tròn, cung, conic, góc, khoảng cách, diện tích, đối xứng, tịnh tiến, vị tự...) có sẵn trong lớp cha và không nằm đầy đủ trong gói này.

## 4. Bản đồ: việc cần làm cho web -> nơi đọc

| Việc cần làm | Nên đọc |
|---|---|
| Dựng hình chóp, lăng trụ | `AlgoPolyhedronPointsPyramid`, `AlgoPolyhedronPointsPrism`, `AlgoPolyhedronPoints`, `GeoPolyhedron` |
| Hình đa diện đều (tứ diện, lập phương) | `kernel3D/solid` (trong file 01), `archimedeanSolid` trong file 01 |
| Mặt phẳng qua 3 điểm, vuông góc, song song | `AlgoPlaneThreePoints`, `AlgoOrthoPlane*`, `AlgoPlaneThroughPoint*` |
| Giao tuyến hai mặt phẳng | `AlgoIntersectPlanes`, `AlgoIntersectCoordSys` |
| Thiết diện (mặt phẳng cắt đa diện) | `AlgoIntersectPlanePolyhedron`, `AlgoIntersectPlanePolygon` |
| Giao điểm đường thẳng và mặt phẳng/đa giác | `AlgoIntersectLinePlane*`, `AlgoIntersectLinePolygon3D` |
| Khoảng cách | `AlgoDistancePointPlane3D`, `AlgoDistanceLines3D`, `AlgoDistancePlanes` |
| Góc đường-đường, đường-mặt, mặt-mặt | `AlgoAngleLines3D`, `AlgoAngleLinePlane`, `AlgoAnglePlanes` |
| Thể tích | `AlgoVolume` |
| Khai triển (net) | `AlgoPolyhedronNet*` |
| Đẩy khối, nón/trụ | `AlgoForExtrusion`, `ExtrusionComputer`, `AlgoQuadricLimited*` |
| Đối xứng, quay | `AlgoMirror3D`, `AlgoRotate3D*` |
| Nét đứt/nét liền cho cạnh khuất | file 05: `DrawPolyhedron3D`, `DrawSegment3D`, `Drawable3D` |
| Toán vector, ma trận | `Coords`, `CoordSys`, `CoordMatrix` trong file 04 |

## 5. Giới hạn của gói này
- Không có phần giao diện, kết xuất OpenGL, in 3D, XR.
- Chỉ giữ một phần lớp nền của phần 2D (đa giác, đoạn, đường, điểm, vector). Lớp nào tham chiếu mà không thấy trong gói thì là lớp nền không đưa vào.
- Danh sách công cụ lấy từ mã nguồn, chưa chạy thử GeoGebra để đối chiếu.
