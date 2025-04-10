'use client';

import {useState, useEffect} from 'react';
import AccessLinkModal from '@/components/AccessLinkModal';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <AccessLinkModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
