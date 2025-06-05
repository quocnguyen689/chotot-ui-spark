import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Upload } from "lucide-react";
import { useCreateItem, useCategories } from "@/hooks/use-marketplace";

export function CreateItemDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "VND",
    category: "",
    condition: "",
    city: "",
    district: "",
  });

  // API hooks
  const createItemMutation = useCreateItem();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const conditions = [
    { value: "new", label: "Mới" },
    { value: "like_new", label: "Như mới" },
    { value: "good", label: "Tốt" },
    { value: "fair", label: "Khá" },
    { value: "poor", label: "Cũ" },
  ];

  const cities = [
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Đà Nẵng",
    "Cần Thơ",
    "Hải Phòng",
    "Biên Hòa",
    "Nha Trang",
    "Huế",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const itemData = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      currency: formData.currency,
      images: ["https://via.placeholder.com/300x200"], // Demo image
      category: formData.category,
      condition: formData.condition as any,
      location: {
        city: formData.city,
        district: formData.district,
      },
    };

    createItemMutation.mutate(itemData, {
      onSuccess: () => {
        setIsOpen(false);
        setFormData({
          title: "",
          description: "",
          price: "",
          currency: "VND",
          category: "",
          condition: "",
          city: "",
          district: "",
        });
      },
    });
  };

  const isFormValid =
    formData.title &&
    formData.description &&
    formData.price &&
    formData.category &&
    formData.condition &&
    formData.city;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Đăng tin demo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Đăng tin bán hàng
            <Badge variant="outline" className="ml-2 text-xs">
              API Demo
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Tạo một sản phẩm mới trên marketplace (demo API call)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="VD: iPhone 15 Pro Max 256GB..."
              maxLength={100}
            />
            <p className="text-xs text-gray-500">
              {formData.title.length}/100 ký tự
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Mô tả chi tiết về sản phẩm..."
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-500">
              {formData.description.length}/500 ký tự
            </p>
          </div>

          {/* Price */}
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="price">Giá *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Đơn vị</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => handleInputChange("currency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VND">VND</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Danh mục *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categoriesLoading ? (
                  <SelectItem value="loading" disabled>
                    Đang tải...
                  </SelectItem>
                ) : categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))
                ) : (
                  // Demo categories
                  <>
                    <SelectItem value="electronics">Điện tử</SelectItem>
                    <SelectItem value="fashion">Thời trang</SelectItem>
                    <SelectItem value="home">Nhà cửa</SelectItem>
                    <SelectItem value="vehicles">Xe cộ</SelectItem>
                    <SelectItem value="books">Sách</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <Label>Tình trạng *</Label>
            <Select
              value={formData.condition}
              onValueChange={(value) => handleInputChange("condition", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn tình trạng" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((condition) => (
                  <SelectItem key={condition.value} value={condition.value}>
                    {condition.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label>Thành phố *</Label>
              <Select
                value={formData.city}
                onValueChange={(value) => handleInputChange("city", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thành phố" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quận/Huyện</Label>
              <Input
                value={formData.district}
                onChange={(e) => handleInputChange("district", e.target.value)}
                placeholder="VD: Quận 1"
              />
            </div>
          </div>

          {/* Images placeholder */}
          <div className="space-y-2">
            <Label>Hình ảnh</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                Demo: Sẽ sử dụng hình ảnh mặc định
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || createItemMutation.isPending}
              className="flex-1"
            >
              {createItemMutation.isPending ? "Đang đăng..." : "Đăng tin"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
