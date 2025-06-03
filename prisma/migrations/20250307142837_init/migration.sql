-- CreateTable
CREATE TABLE `DonViHanhChinh` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenDonVi` VARCHAR(255) NOT NULL,
    `idCha` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HopDongBaoHiem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nhaCungCap` VARCHAR(255) NOT NULL,
    `noiDung` VARCHAR(255) NOT NULL,
    `ngayBatDau` DATETIME(3) NOT NULL,
    `ngayKetThuc` DATETIME(3) NOT NULL,
    `ToaNhaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ToaNha` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenToaNha` VARCHAR(255) NOT NULL,
    `diaChi` VARCHAR(255) NOT NULL,
    `soTang` INTEGER NOT NULL,
    `DonViHanhChinhId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HinhAnhPhongTro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `moTa` VARCHAR(255) NOT NULL,
    `hinhAnh` VARCHAR(255) NOT NULL,
    `PhongTroId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TinhTrangPhong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tinhTrang` VARCHAR(255) NOT NULL,
    `ngayCapNhat` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhongTro_TinhTrangPhong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `PhongTroId` INTEGER NOT NULL,
    `TinhTrangPhongId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoaiPhong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenLoaiPhong` VARCHAR(255) NOT NULL,
    `moTa` TEXT NOT NULL,
    `giaCoBan` DOUBLE NOT NULL,
    `PhongTroId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhongTro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenPhong` VARCHAR(45) NOT NULL,
    `tang` INTEGER NOT NULL,
    `kichThuoc` DOUBLE NOT NULL,
    `giaPhong` DOUBLE NOT NULL,
    `soNguoiToiDa` INTEGER NOT NULL,
    `ToaNhaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DanhSachDichVu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenDichVu` VARCHAR(255) NOT NULL,
    `dacTa` TEXT NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhongTro_DanhSachDichVu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `soLuong` INTEGER NOT NULL,
    `loaiDichVu` VARCHAR(255) NOT NULL,
    `ghiChu` VARCHAR(255) NOT NULL,
    `PhongTroId` INTEGER NOT NULL,
    `DanhSachDichVuId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChiTietKhuyenMai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phanTram` DOUBLE NOT NULL,
    `PhongTroId` INTEGER NOT NULL,
    `KhuyenMaiId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KhuyenMai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenKhuyenMai` VARCHAR(255) NOT NULL,
    `moTa` TEXT NOT NULL,
    `phanTramGiamGia` DOUBLE NOT NULL,
    `ngayBatDau` DATETIME(3) NOT NULL,
    `ngayKetThuc` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhongTro_ThietBi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `soLuong` INTEGER NOT NULL,
    `tinhTrang` VARCHAR(255) NOT NULL,
    `PhongTroId` INTEGER NOT NULL,
    `ThietBiId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ThietBi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenThietBi` VARCHAR(255) NOT NULL,
    `loaiThietBi` VARCHAR(255) NOT NULL,
    `soLuong` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kho_ThietBi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `soLuong` INTEGER NOT NULL,
    `ghiChu` VARCHAR(255) NOT NULL,
    `ThietBiId` INTEGER NOT NULL,
    `KhoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenKho` VARCHAR(255) NOT NULL,
    `diaChi` VARCHAR(255) NOT NULL,
    `sucChua` VARCHAR(255) NOT NULL,
    `QuanLyKhoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuanLyKho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayBatDau` DATETIME(3) NOT NULL,
    `ngayKetThuc` DATETIME(3) NOT NULL,
    `NhanVienId` INTEGER NOT NULL,

    UNIQUE INDEX `QuanLyKho_NhanVienId_key`(`NhanVienId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChiTietSuaChua` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenSuaChua` VARCHAR(255) NOT NULL,
    `soTien` DOUBLE NOT NULL,
    `ThietBiId` INTEGER NOT NULL,
    `SuaChuaThietBiId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SuaChuaThietBi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenSuaChua` VARCHAR(255) NOT NULL,
    `tenNhanVien` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NhanVien_SuaChuaThietBi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `SuaChuaThietBiId` INTEGER NOT NULL,
    `NhanVienId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GiaHanHopDong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayGiaHan` DATETIME(3) NOT NULL,
    `ngayKetThuc` DATETIME(3) NOT NULL,
    `HopDongId` INTEGER NOT NULL,

    UNIQUE INDEX `GiaHanHopDong_HopDongId_key`(`HopDongId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HopDong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayBatDau` DATETIME(3) NOT NULL,
    `ngayKetThuc` DATETIME(3) NOT NULL,
    `tienDaCoc` DOUBLE NOT NULL,
    `tongTien` DOUBLE NOT NULL,
    `noiDung` VARCHAR(255) NOT NULL,
    `ghiChu` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChiTietHopDong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayBatDau` DATETIME(3) NOT NULL,
    `ngayKetThuc` DATETIME(3) NOT NULL,
    `dieuKhoan` VARCHAR(255) NOT NULL,
    `ghiChu` VARCHAR(255) NOT NULL,
    `HopDongId` INTEGER NOT NULL,
    `PhongTroId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LichSuThayDoiPhong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPhongCu` INTEGER NOT NULL,
    `idPhongMoi` INTEGER NOT NULL,
    `ngayChuyen` DATETIME(3) NOT NULL,
    `donGia` DOUBLE NOT NULL,
    `ghiChu` VARCHAR(255) NOT NULL,
    `HopDongId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DanhGia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `noiDung` VARCHAR(255) NOT NULL,
    `ngayDanhGia` DATETIME(3) NOT NULL,
    `soSao` INTEGER NOT NULL,
    `PhongTroId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChiTietDanhGia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `DanhGiaId` INTEGER NOT NULL,
    `KhachHangId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhanHoi_PhongTro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhuongTienDiChuyen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loaiPhuongTien` VARCHAR(255) NOT NULL,
    `bienSo` VARCHAR(255) NOT NULL,
    `soLuong` INTEGER NOT NULL,
    `KhachHangId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HoaDon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayLap` DATETIME(3) NOT NULL,
    `loaiHoaDon` VARCHAR(255) NOT NULL,
    `tinhTrang` VARCHAR(255) NOT NULL,
    `soTien` DOUBLE NOT NULL,
    `LichSuThanhToanId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhuongThucThanhToan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loaiGiaoDich` VARCHAR(255) NOT NULL,
    `moTa` VARCHAR(45) NOT NULL,
    `ghiChu` VARCHAR(45) NOT NULL,
    `LichSuThanhToanId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LichSuThanhToan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayThanhToan` DATETIME(3) NOT NULL,
    `soTien` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhanHoi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `noiDung` VARCHAR(255) NOT NULL,
    `ngayPhanHoi` DATETIME(3) NOT NULL,
    `trangThai` BOOLEAN NOT NULL,
    `KhachHangId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KhachHang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hoTen` VARCHAR(255) NOT NULL,
    `ngaySinh` DATETIME(3) NOT NULL,
    `cccd` INTEGER NOT NULL,
    `diaChi` VARCHAR(255) NOT NULL,
    `soDienThoai` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `QuanLyKhachHangId` INTEGER NOT NULL,

    UNIQUE INDEX `KhachHang_cccd_key`(`cccd`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LichSuSuDungDichVu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngaySuDung` DATETIME(3) NOT NULL,
    `soLuong` INTEGER NOT NULL,
    `thanhTien` DOUBLE NOT NULL,
    `KhachHangId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChamSocKhachHang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayHoTro` DATETIME(3) NOT NULL,
    `loaiHoTro` VARCHAR(255) NOT NULL,
    `tenHoTro` VARCHAR(255) NOT NULL,
    `KhachHangId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KhachHang_ThongBao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `KhachHangId` INTEGER NOT NULL,
    `ThongBaoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ThongBao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tieuDe` VARCHAR(255) NOT NULL,
    `ngayThongBao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuanLyKhachHang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ghiChu` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhanHoiNhanVien` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayPhanHoi` DATETIME(3) NOT NULL,
    `trangThai` BOOLEAN NOT NULL,
    `PhanHoiId` INTEGER NOT NULL,
    `XuLyPhanHoiId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `XuLyPhanHoi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayXuLy` DATETIME(3) NOT NULL,
    `noiDungPhanHoi` VARCHAR(255) NOT NULL,
    `ghiChu` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DanhSachSuCo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayBaoCao` DATETIME(3) NOT NULL,
    `ngayXuLy` DATETIME(3) NOT NULL,
    `ngayKetThuc` DATETIME(3) NOT NULL,
    `tinhTrang` VARCHAR(255) NOT NULL,
    `moTa` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `XuLySuCo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BaoTriPhongTro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loaiBaoTri` VARCHAR(255) NOT NULL,
    `tenBaoTri` VARCHAR(255) NOT NULL,
    `ngayBaoTri` DATETIME(3) NOT NULL,
    `tenNhanVien` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuanLyPhongTro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayBatDau` DATETIME(3) NOT NULL,
    `ngayKetThuc` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HopDongNhanVien` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hoTen` VARCHAR(255) NOT NULL,
    `ngayBatDau` DATETIME(3) NOT NULL,
    `ngayKetThuc` DATETIME(3) NOT NULL,
    `luongCoBan` DOUBLE NOT NULL,
    `ghiChu` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChiTietHopDongNhanVien` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayBatDau` DATETIME(3) NOT NULL,
    `ngayKetThuc` DATETIME(3) NOT NULL,
    `HopDongNhanVienId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GiaHanHopDongNhanVien` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayGiaHan` DATETIME(3) NOT NULL,
    `ngayKetThuc` DATETIME(3) NOT NULL,
    `ChiTietHopDongNhanVienId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NhanVien` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hoTen` VARCHAR(255) NOT NULL,
    `ngaySinh` DATETIME(3) NOT NULL,
    `gioiTinh` BOOLEAN NOT NULL,
    `soDienThoai` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `diaChi` VARCHAR(255) NOT NULL,
    `HopDongNhanVienId` INTEGER NOT NULL,
    `BangChamCongId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NhanVien_ChucVu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayBatDau` DATETIME(3) NOT NULL,
    `ngayKetThuc` DATETIME(3) NOT NULL,
    `NhanVienId` INTEGER NOT NULL,
    `ChucVuId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChucVu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hoTen` VARCHAR(255) NOT NULL,
    `ngayBatDau` DATETIME(3) NOT NULL,
    `ngayKetThuc` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NhanVien_LichLamViec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `NhanVienId` INTEGER NOT NULL,
    `LichLamViecId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LichLamViec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayLamViec` DATETIME(3) NOT NULL,
    `caLam` VARCHAR(255) NOT NULL,
    `ghiChu` VARCHAR(255) NOT NULL,
    `LuongId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Luong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hoTen` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BangChamCong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayChamCong` DATETIME(3) NOT NULL,
    `LuongId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NhanVien_ChiTraLuong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `NhanVienId` INTEGER NOT NULL,
    `ChiTraLuongId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChiTraLuong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `soTien` DOUBLE NOT NULL,
    `ngayPhatLuong` DATETIME(3) NOT NULL,
    `LichSuChiTraLuongId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LichSuChiTraLuong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ghiChu` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HopDongBaoHiem` ADD CONSTRAINT `HopDongBaoHiem_ToaNhaId_fkey` FOREIGN KEY (`ToaNhaId`) REFERENCES `ToaNha`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ToaNha` ADD CONSTRAINT `ToaNha_DonViHanhChinhId_fkey` FOREIGN KEY (`DonViHanhChinhId`) REFERENCES `DonViHanhChinh`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HinhAnhPhongTro` ADD CONSTRAINT `HinhAnhPhongTro_PhongTroId_fkey` FOREIGN KEY (`PhongTroId`) REFERENCES `PhongTro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhongTro_TinhTrangPhong` ADD CONSTRAINT `PhongTro_TinhTrangPhong_PhongTroId_fkey` FOREIGN KEY (`PhongTroId`) REFERENCES `PhongTro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhongTro_TinhTrangPhong` ADD CONSTRAINT `PhongTro_TinhTrangPhong_TinhTrangPhongId_fkey` FOREIGN KEY (`TinhTrangPhongId`) REFERENCES `TinhTrangPhong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LoaiPhong` ADD CONSTRAINT `LoaiPhong_PhongTroId_fkey` FOREIGN KEY (`PhongTroId`) REFERENCES `PhongTro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhongTro` ADD CONSTRAINT `PhongTro_ToaNhaId_fkey` FOREIGN KEY (`ToaNhaId`) REFERENCES `ToaNha`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhongTro_DanhSachDichVu` ADD CONSTRAINT `PhongTro_DanhSachDichVu_PhongTroId_fkey` FOREIGN KEY (`PhongTroId`) REFERENCES `PhongTro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhongTro_DanhSachDichVu` ADD CONSTRAINT `PhongTro_DanhSachDichVu_DanhSachDichVuId_fkey` FOREIGN KEY (`DanhSachDichVuId`) REFERENCES `DanhSachDichVu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietKhuyenMai` ADD CONSTRAINT `ChiTietKhuyenMai_PhongTroId_fkey` FOREIGN KEY (`PhongTroId`) REFERENCES `PhongTro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietKhuyenMai` ADD CONSTRAINT `ChiTietKhuyenMai_KhuyenMaiId_fkey` FOREIGN KEY (`KhuyenMaiId`) REFERENCES `KhuyenMai`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhongTro_ThietBi` ADD CONSTRAINT `PhongTro_ThietBi_PhongTroId_fkey` FOREIGN KEY (`PhongTroId`) REFERENCES `PhongTro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhongTro_ThietBi` ADD CONSTRAINT `PhongTro_ThietBi_ThietBiId_fkey` FOREIGN KEY (`ThietBiId`) REFERENCES `ThietBi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kho_ThietBi` ADD CONSTRAINT `Kho_ThietBi_ThietBiId_fkey` FOREIGN KEY (`ThietBiId`) REFERENCES `ThietBi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kho_ThietBi` ADD CONSTRAINT `Kho_ThietBi_KhoId_fkey` FOREIGN KEY (`KhoId`) REFERENCES `Kho`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kho` ADD CONSTRAINT `Kho_QuanLyKhoId_fkey` FOREIGN KEY (`QuanLyKhoId`) REFERENCES `QuanLyKho`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuanLyKho` ADD CONSTRAINT `QuanLyKho_NhanVienId_fkey` FOREIGN KEY (`NhanVienId`) REFERENCES `NhanVien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietSuaChua` ADD CONSTRAINT `ChiTietSuaChua_ThietBiId_fkey` FOREIGN KEY (`ThietBiId`) REFERENCES `ThietBi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietSuaChua` ADD CONSTRAINT `ChiTietSuaChua_SuaChuaThietBiId_fkey` FOREIGN KEY (`SuaChuaThietBiId`) REFERENCES `SuaChuaThietBi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NhanVien_SuaChuaThietBi` ADD CONSTRAINT `NhanVien_SuaChuaThietBi_SuaChuaThietBiId_fkey` FOREIGN KEY (`SuaChuaThietBiId`) REFERENCES `SuaChuaThietBi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NhanVien_SuaChuaThietBi` ADD CONSTRAINT `NhanVien_SuaChuaThietBi_NhanVienId_fkey` FOREIGN KEY (`NhanVienId`) REFERENCES `NhanVien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GiaHanHopDong` ADD CONSTRAINT `GiaHanHopDong_HopDongId_fkey` FOREIGN KEY (`HopDongId`) REFERENCES `HopDong`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietHopDong` ADD CONSTRAINT `ChiTietHopDong_HopDongId_fkey` FOREIGN KEY (`HopDongId`) REFERENCES `HopDong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietHopDong` ADD CONSTRAINT `ChiTietHopDong_PhongTroId_fkey` FOREIGN KEY (`PhongTroId`) REFERENCES `PhongTro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LichSuThayDoiPhong` ADD CONSTRAINT `LichSuThayDoiPhong_HopDongId_fkey` FOREIGN KEY (`HopDongId`) REFERENCES `HopDong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DanhGia` ADD CONSTRAINT `DanhGia_PhongTroId_fkey` FOREIGN KEY (`PhongTroId`) REFERENCES `PhongTro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietDanhGia` ADD CONSTRAINT `ChiTietDanhGia_DanhGiaId_fkey` FOREIGN KEY (`DanhGiaId`) REFERENCES `DanhGia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietDanhGia` ADD CONSTRAINT `ChiTietDanhGia_KhachHangId_fkey` FOREIGN KEY (`KhachHangId`) REFERENCES `KhachHang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhuongTienDiChuyen` ADD CONSTRAINT `PhuongTienDiChuyen_KhachHangId_fkey` FOREIGN KEY (`KhachHangId`) REFERENCES `KhachHang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HoaDon` ADD CONSTRAINT `HoaDon_LichSuThanhToanId_fkey` FOREIGN KEY (`LichSuThanhToanId`) REFERENCES `LichSuThanhToan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhuongThucThanhToan` ADD CONSTRAINT `PhuongThucThanhToan_LichSuThanhToanId_fkey` FOREIGN KEY (`LichSuThanhToanId`) REFERENCES `LichSuThanhToan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhanHoi` ADD CONSTRAINT `PhanHoi_KhachHangId_fkey` FOREIGN KEY (`KhachHangId`) REFERENCES `KhachHang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KhachHang` ADD CONSTRAINT `KhachHang_QuanLyKhachHangId_fkey` FOREIGN KEY (`QuanLyKhachHangId`) REFERENCES `QuanLyKhachHang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LichSuSuDungDichVu` ADD CONSTRAINT `LichSuSuDungDichVu_KhachHangId_fkey` FOREIGN KEY (`KhachHangId`) REFERENCES `KhachHang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChamSocKhachHang` ADD CONSTRAINT `ChamSocKhachHang_KhachHangId_fkey` FOREIGN KEY (`KhachHangId`) REFERENCES `KhachHang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KhachHang_ThongBao` ADD CONSTRAINT `KhachHang_ThongBao_KhachHangId_fkey` FOREIGN KEY (`KhachHangId`) REFERENCES `KhachHang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KhachHang_ThongBao` ADD CONSTRAINT `KhachHang_ThongBao_ThongBaoId_fkey` FOREIGN KEY (`ThongBaoId`) REFERENCES `ThongBao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhanHoiNhanVien` ADD CONSTRAINT `PhanHoiNhanVien_PhanHoiId_fkey` FOREIGN KEY (`PhanHoiId`) REFERENCES `PhanHoi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhanHoiNhanVien` ADD CONSTRAINT `PhanHoiNhanVien_XuLyPhanHoiId_fkey` FOREIGN KEY (`XuLyPhanHoiId`) REFERENCES `XuLyPhanHoi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietHopDongNhanVien` ADD CONSTRAINT `ChiTietHopDongNhanVien_HopDongNhanVienId_fkey` FOREIGN KEY (`HopDongNhanVienId`) REFERENCES `HopDongNhanVien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GiaHanHopDongNhanVien` ADD CONSTRAINT `GiaHanHopDongNhanVien_ChiTietHopDongNhanVienId_fkey` FOREIGN KEY (`ChiTietHopDongNhanVienId`) REFERENCES `ChiTietHopDongNhanVien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NhanVien` ADD CONSTRAINT `NhanVien_HopDongNhanVienId_fkey` FOREIGN KEY (`HopDongNhanVienId`) REFERENCES `HopDongNhanVien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NhanVien` ADD CONSTRAINT `NhanVien_BangChamCongId_fkey` FOREIGN KEY (`BangChamCongId`) REFERENCES `BangChamCong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NhanVien_ChucVu` ADD CONSTRAINT `NhanVien_ChucVu_NhanVienId_fkey` FOREIGN KEY (`NhanVienId`) REFERENCES `NhanVien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NhanVien_ChucVu` ADD CONSTRAINT `NhanVien_ChucVu_ChucVuId_fkey` FOREIGN KEY (`ChucVuId`) REFERENCES `ChucVu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NhanVien_LichLamViec` ADD CONSTRAINT `NhanVien_LichLamViec_NhanVienId_fkey` FOREIGN KEY (`NhanVienId`) REFERENCES `NhanVien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NhanVien_LichLamViec` ADD CONSTRAINT `NhanVien_LichLamViec_LichLamViecId_fkey` FOREIGN KEY (`LichLamViecId`) REFERENCES `LichLamViec`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LichLamViec` ADD CONSTRAINT `LichLamViec_LuongId_fkey` FOREIGN KEY (`LuongId`) REFERENCES `Luong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BangChamCong` ADD CONSTRAINT `BangChamCong_LuongId_fkey` FOREIGN KEY (`LuongId`) REFERENCES `Luong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NhanVien_ChiTraLuong` ADD CONSTRAINT `NhanVien_ChiTraLuong_NhanVienId_fkey` FOREIGN KEY (`NhanVienId`) REFERENCES `NhanVien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NhanVien_ChiTraLuong` ADD CONSTRAINT `NhanVien_ChiTraLuong_ChiTraLuongId_fkey` FOREIGN KEY (`ChiTraLuongId`) REFERENCES `ChiTraLuong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTraLuong` ADD CONSTRAINT `ChiTraLuong_LichSuChiTraLuongId_fkey` FOREIGN KEY (`LichSuChiTraLuongId`) REFERENCES `LichSuChiTraLuong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
