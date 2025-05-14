
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as "signin" | "signup");
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: activeTab === "signin" ? "Signed in successfully!" : "Account created!",
      description: activeTab === "signin" 
        ? "Welcome back to Re-Genπ." 
        : "Your Re-Genπ account has been created successfully.",
    });
    
    setIsLoading(false);
    onOpenChange(false);
    
    // Reset form
    setEmail("");
    setPassword("");
    setName("");
    setOrganization("");
  };
  
  const handleForgotPassword = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address first.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Reset link sent",
      description: `Password reset instructions have been sent to ${email}`,
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {activeTab === "signin" ? "Sign In" : "Create Account"}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="signin" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input 
                  id="signin-email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="signin-password">Password</Label>
                  <button 
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </button>
                </div>
                <Input 
                  id="signin-password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button">
                  Google
                </Button>
                <Button variant="outline" type="button">
                  Microsoft
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input 
                  id="signup-name" 
                  type="text" 
                  placeholder="John Smith" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-org">Organization</Label>
                <Input 
                  id="signup-org" 
                  type="text" 
                  placeholder="Your Company" 
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long.
                </p>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button">
                  Google
                </Button>
                <Button variant="outline" type="button">
                  Microsoft
                </Button>
              </div>
              
              <p className="text-xs text-center text-muted-foreground">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">Terms & Conditions</a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
