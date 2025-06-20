"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import AuthModal from "@/components/ui/AuthModal";

export default function AuthPage() {
  return (
    <Dialog open>
      <DialogContent className="max-w-md w-full p-0 bg-white rounded-2xl shadow-xl">
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        <AuthModal />
      </DialogContent>
    </Dialog>
  );
} 