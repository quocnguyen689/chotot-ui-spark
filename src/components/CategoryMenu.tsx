import React from 'react';
import { Home, Car, User, Camera } from 'lucide-react';
const categories = [{
  name: 'Bất động\nsản',
  icon: Home,
  color: 'bg-blue-100'
}, {
  name: 'Xe cỗ',
  icon: Car,
  color: 'bg-green-100'
}, {
  name: 'Việc làm',
  icon: User,
  color: 'bg-purple-100'
}, {
  name: 'Đồ Điện tử',
  icon: Camera,
  color: 'bg-orange-100'
}, {
  name: 'Thời trang',
  icon: User,
  color: 'bg-pink-100'
}, {
  name: 'Tủ lạnh,\nmáy lạnh...',
  icon: Home,
  color: 'bg-cyan-100'
}, {
  name: 'Đồ gia\ndụng, nội...',
  icon: Home,
  color: 'bg-yellow-100'
}, {
  name: 'Thú cưng',
  icon: User,
  color: 'bg-red-100'
}, {
  name: 'Thể thao,\nSở thích',
  icon: User,
  color: 'bg-indigo-100'
}, {
  name: 'Mẹ và\nBé',
  icon: User,
  color: 'bg-lime-100'
}];
const CategoryMenu = () => {
  return <div className="px-4 bg-white py-[16px]">
      <div className="grid grid-cols-5 gap-4">
        {categories.map((category, index) => <div key={index} className="flex flex-col items-center">
            <div className="mx-0 rounded-full">
              <category.icon className="w-6 h-6 text-gray-700" />
            </div>
            <span className="text-xs text-gray-700 text-center leading-tight font-medium">
              {category.name}
            </span>
          </div>)}
      </div>
    </div>;
};
export default CategoryMenu;