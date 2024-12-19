"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";

interface EntertainmentItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  playtime?: number;
  tags?: string[];
}

interface EntertainmentCarouselProps {
  items: EntertainmentItem[];
  category: string;
}

export function EntertainmentCarousel({ items, category }: EntertainmentCarouselProps) {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const CARD_WIDTH = 320;
  const GAP = 20;
  const ITEM_FULL_WIDTH = CARD_WIDTH + GAP;
  const extendedItems = [...items, ...items, ...items];
  const totalWidth = items.length * ITEM_FULL_WIDTH;

  useEffect(() => {
    // 初始位置设置在中间组，并向前偏移一个卡片位置
    const initialPosition = (-items.length * ITEM_FULL_WIDTH) + ITEM_FULL_WIDTH;
    setPosition(initialPosition);
    controls.set({ x: initialPosition });
  }, [items.length, ITEM_FULL_WIDTH]);

  const handleDragStart = () => {
    controls.set({ x: position });
  };

  const handleDrag = (event: any, info: PanInfo) => {
    const newPosition = position + info.delta.x;
    
    let adjustedPosition = newPosition;
    
    // 处理循环逻辑
    if (newPosition > -ITEM_FULL_WIDTH) {
      adjustedPosition = newPosition - totalWidth;
      setPosition(adjustedPosition);
    } else if (newPosition < -(totalWidth * 2 - ITEM_FULL_WIDTH)) {
      adjustedPosition = newPosition + totalWidth;
      setPosition(adjustedPosition);
    } else {
      setPosition(newPosition);
    }

    controls.set({ x: adjustedPosition });
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const velocity = info.velocity.x;
    let finalPosition = position;

    // 添加一些动量效果
    if (Math.abs(velocity) > 100) {
      finalPosition += Math.sign(velocity) * ITEM_FULL_WIDTH;
    }

    // 对齐到最近的卡片位置
    const targetPosition = Math.round(finalPosition / ITEM_FULL_WIDTH) * ITEM_FULL_WIDTH;
    
    setPosition(targetPosition);
    controls.start({
      x: targetPosition,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 200
      }
    });
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-4">{category}</h3>
      {items.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No items to display
        </div>
      ) : (
        <div 
          ref={containerRef}
          className="relative overflow-hidden py-4"
        >
          {/* 左侧渐变 */}
          <div className="absolute left-0 top-4 bottom-4 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          
          <motion.div
            className="flex gap-5 px-10"
            drag="x"
            dragDirectionLock
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ 
              cursor: "grab",
              touchAction: "none"
            }}
          >
            {extendedItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                className="flex-none w-[300px] rounded-xl overflow-hidden bg-card shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative aspect-[16/9]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  {item.playtime && (
                    <p className="text-sm font-medium">
                      Played {item.playtime} hours in last 2 weeks
                    </p>
                  )}
                  {item.tags && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 右侧渐变 */}
          <div className="absolute right-0 top-4 bottom-4 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
      )}
    </div>
  );
} 