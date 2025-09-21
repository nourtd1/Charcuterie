"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, User as UserIcon, Lock } from "lucide-react";

const registerSchema = z.object({
    name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
    password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
});

const loginSchema = z.object({
    email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
    password: z.string().min(1, { message: "Veuillez entrer votre mot de passe." }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;


export default function AccountPage() {
    const { user, loading } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const registerForm = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    });

    const loginForm = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });
    
    const handleRegister: SubmitHandler<RegisterFormValues> = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(userCredential.user, { displayName: data.name });
            toast({ title: "Compte créé avec succès !", description: "Vous êtes maintenant connecté." });
            router.push('/account');
        } catch (error: any) {
            let message = "Une erreur est survenue lors de la création du compte.";
            if (error.code === 'auth/email-already-in-use') {
                message = "Cette adresse email est déjà utilisée.";
            }
            toast({ title: "Erreur", description: message, variant: "destructive" });
        }
    };

    const handleLogin: SubmitHandler<LoginFormValues> = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast({ title: "Connexion réussie", description: "Bienvenue !" });
            router.push('/account');
        } catch (error: any) {
            let message = "Une erreur est survenue lors de la connexion.";
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                message = "Email ou mot de passe incorrect.";
            }
            toast({ title: "Erreur", description: message, variant: "destructive" });
        }
    };

    const handlePasswordReset = async () => {
        if (!user?.email) return;
        try {
            await sendPasswordResetEmail(auth, user.email);
            toast({ title: "Email envoyé", description: "Consultez votre boîte de réception pour réinitialiser votre mot de passe." });
        } catch (error) {
            toast({ title: "Erreur", description: "Une erreur est survenue lors de l'envoi de l'email.", variant: "destructive" });
        }
    };
    
    const handleLoginPasswordReset = async () => {
        const email = loginForm.getValues("email");
        if (!email) {
             toast({ title: "Erreur", description: "Veuillez entrer votre adresse email dans le champ ci-dessus.", variant: "destructive" });
            return;
        }
         try {
            await sendPasswordResetEmail(auth, email);
            toast({ title: "Email envoyé", description: `Un lien pour réinitialiser votre mot de passe a été envoyé à ${email}.` });
        } catch (error: any) {
             let message = "Une erreur est survenue.";
             if(error.code === 'auth/user-not-found'){
                 message = "Aucun utilisateur trouvé avec cette adresse email."
             }
            toast({ title: "Erreur", description: message, variant: "destructive" });
        }
    }

    const handleLogout = async () => {
        await signOut(auth);
        toast({ title: "Déconnexion réussie" });
        router.push('/');
    };

    if (loading) {
        return <div className="container mx-auto py-24 text-center">Chargement...</div>
    }

    if (user) {
        return (
            <div className="container mx-auto py-16 md:py-24">
                 <div className="mb-12">
                    <h1 className="text-4xl font-bold font-headline">Mon Compte</h1>
                    <p className="text-muted-foreground">Bienvenue, {user.displayName || user.email} !</p>
                </div>
                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 max-w-2xl">
                        <TabsTrigger value="profile"><UserIcon className="mr-2"/>Profil</TabsTrigger>
                        <TabsTrigger value="orders"><ShoppingBag className="mr-2"/>Commandes</TabsTrigger>
                        <TabsTrigger value="security"><Lock className="mr-2"/>Sécurité</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations personnelles</CardTitle>
                                <CardDescription>Gérez vos informations de contact.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                <div className="space-y-2">
                                    <Label>Nom complet</Label>
                                    <Input value={user.displayName || 'Non défini'} disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label>Adresse email</Label>
                                    <Input value={user.email || ''} disabled />
                                </div>
                            </CardContent>
                             <CardFooter className="border-t px-6 py-4 mt-6">
                               <p className="text-xs text-muted-foreground">Pour modifier ces informations, veuillez contacter le support.</p>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="orders">
                         <Card>
                            <CardHeader>
                                <CardTitle>Historique des commandes</CardTitle>
                                <CardDescription>Consultez vos achats passés.</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="text-center py-12 text-muted-foreground">
                                    <ShoppingBag className="mx-auto h-12 w-12" />
                                    <p className="mt-4">Vous n'avez effectué aucune commande pour le moment.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                     <TabsContent value="security">
                         <Card>
                            <CardHeader>
                                <CardTitle>Sécurité</CardTitle>
                                <CardDescription>Gérez les paramètres de sécurité de votre compte.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <div>
                                    <h3 className="font-medium">Changer le mot de passe</h3>
                                    <p className="text-sm text-muted-foreground mt-1">Un email sera envoyé à votre adresse pour procéder au changement.</p>
                                    <Button onClick={handlePasswordReset} variant="outline" className="mt-4">
                                        Recevoir un lien de réinitialisation
                                    </Button>
                                </div>
                                <Separator />
                                <div>
                                     <h3 className="font-medium">Se déconnecter</h3>
                                     <p className="text-sm text-muted-foreground mt-1">Met fin à votre session actuelle sur cet appareil.</p>
                                    <Button onClick={handleLogout} variant="destructive" className="mt-4">Se déconnecter</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        )
    }

  return (
    <div className="relative -mt-16">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-accent/10 to-background" />
      <div className="absolute -z-10 top-[-20%] right-[-10%] h-[60vh] w-[60vh] rounded-full bg-accent/25 blur-3xl" />
      <div className="absolute -z-10 bottom-[-20%] left-[-10%] h-[60vh] w-[60vh] rounded-full bg-primary/25 blur-3xl" />

      {/* Hero */}
      <section className="h-[30vh] w-full flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-black font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Connexion & Inscription
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Accédez à votre compte pour gérer vos commandes et préférences.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 flex justify-center">
          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2 bg-card/60 backdrop-blur-md border border-border/40">
              <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground">
                Se connecter
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground">
                S'inscrire
              </TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login">
              <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-xl">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)}>
                    <CardHeader>
                      <CardTitle className="font-headline text-foreground">Accéder à votre compte</CardTitle>
                      <CardDescription className="text-muted-foreground">Entrez vos identifiants pour voir vos commandes.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="votre@email.com" className="bg-background/60" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                              <Input type="password" className="bg-background/60" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                      <Button className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90" type="submit" disabled={loginForm.formState.isSubmitting}>
                        {loginForm.formState.isSubmitting ? "Connexion..." : "Se connecter"}
                      </Button>
                      <Button variant="link" size="sm" type="button" onClick={handleLoginPasswordReset}>
                        Mot de passe oublié ?
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>

            {/* Register */}
            <TabsContent value="register">
              <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-xl">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)}>
                    <CardHeader>
                      <CardTitle className="font-headline text-foreground">Créer un compte</CardTitle>
                      <CardDescription className="text-muted-foreground">Rejoignez-nous pour une expérience d'achat simplifiée.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                              <Input placeholder="Julie Dupont" className="bg-background/60" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="votre@email.com" className="bg-background/60" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                              <Input type="password" className="bg-background/60" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmer le mot de passe</FormLabel>
                            <FormControl>
                              <Input type="password" className="bg-background/60" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90" type="submit" disabled={registerForm.formState.isSubmitting}>
                        {registerForm.formState.isSubmitting ? "Création..." : "Créer mon compte"}
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
