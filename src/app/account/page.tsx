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
import { ShoppingBag, User as UserIcon, Lock, Mail, Calendar, Shield, Settings, Bell, CreditCard, MapPin, Phone, Edit3, CheckCircle, Clock, Package, Star, Award, Truck, Heart, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

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
            <div className="bg-background min-h-screen">
                {/* Hero Section */}
                <section className="relative -mt-16 h-[50vh] w-full flex items-center justify-center text-center overflow-hidden">
                    <Image
                        src="/assets/images/banners/accueil_banner.jpg"
                        alt="Mon Compte"
                        fill
                        sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px"
                        className="object-cover -z-20"
                        priority
                    />
                    <div className="absolute inset-0 -z-10 hero-overlay" />
                    <div className="relative z-10 max-w-4xl w-[95%] px-4 text-white">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30">
                                <UserIcon className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-headline mb-4 leading-tight animate-slide-in-left">
                            Mon Compte
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-6 animate-fade-in-up">
                            Bienvenue, <span className="font-bold text-white">{user.displayName || user.email}</span> !
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base animate-fade-in-up">
                            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                                <CheckCircle className="w-4 h-4" />
                                Compte vérifié
                            </span>
                            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                                <Calendar className="w-4 h-4" />
                                Membre depuis {new Date(user.metadata.creationTime).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="container mx-auto py-16 md:py-24 px-4">
                    <Tabs defaultValue="profile" className="w-full">
                        {/* Navigation Tabs */}
                        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto mb-8 bg-card/60 backdrop-blur-md border border-border/40 shadow-lg">
                            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground">
                                <UserIcon className="mr-2 w-4 h-4" />
                                Profil
                            </TabsTrigger>
                            <TabsTrigger value="orders" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground">
                                <ShoppingBag className="mr-2 w-4 h-4" />
                                Commandes
                            </TabsTrigger>
                            <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground">
                                <Shield className="mr-2 w-4 h-4" />
                                Sécurité
                            </TabsTrigger>
                        </TabsList>

                        {/* Profile Tab */}
                        <TabsContent value="profile" className="space-y-8">
                            {/* Profile Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-lg">
                                    <CardHeader className="text-center">
                                        <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                            <UserIcon className="w-10 h-10 text-white" />
                                        </div>
                                        <CardTitle className="text-xl">Informations personnelles</CardTitle>
                                        <CardDescription>Vos données de profil</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-muted-foreground">Nom complet</Label>
                                            <div className="flex items-center gap-2 p-3 bg-background/60 rounded-lg border">
                                                <UserIcon className="w-4 h-4 text-muted-foreground" />
                                                <span className="font-medium">{user.displayName || 'Non défini'}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-muted-foreground">Adresse email</Label>
                                            <div className="flex items-center gap-2 p-3 bg-background/60 rounded-lg border">
                                                <Mail className="w-4 h-4 text-muted-foreground" />
                                                <span className="font-medium">{user.email}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-lg">
                                    <CardHeader className="text-center">
                                        <div className="w-20 h-20 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                            <ShoppingBag className="w-10 h-10 text-white" />
                                        </div>
                                        <CardTitle className="text-xl">Statistiques</CardTitle>
                                        <CardDescription>Votre activité</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-primary">0</div>
                                            <div className="text-sm text-muted-foreground">Commandes</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-accent">$0</div>
                                            <div className="text-sm text-muted-foreground">Total dépensé</div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-lg">
                                    <CardHeader className="text-center">
                                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Award className="w-10 h-10 text-white" />
                                        </div>
                                        <CardTitle className="text-xl">Statut</CardTitle>
                                        <CardDescription>Votre niveau</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600">Nouveau</div>
                                            <div className="text-sm text-muted-foreground">Membre</div>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2">
                                            <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: '25%' }}></div>
                                        </div>
                                        <div className="text-xs text-center text-muted-foreground">25% vers le niveau suivant</div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Quick Actions */}
                            <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Settings className="w-5 h-5" />
                                        Actions rapides
                                    </CardTitle>
                                    <CardDescription>Gérez votre compte facilement</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                                            <Edit3 className="w-6 h-6" />
                                            <span className="text-sm">Modifier le profil</span>
                                        </Button>
                                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                                            <Bell className="w-6 h-6" />
                                            <span className="text-sm">Notifications</span>
                                        </Button>
                                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                                            <Heart className="w-6 h-6" />
                                            <span className="text-sm">Favoris</span>
                                        </Button>
                                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                                            <CreditCard className="w-6 h-6" />
                                            <span className="text-sm">Moyens de paiement</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Orders Tab */}
                        <TabsContent value="orders" className="space-y-8">
                            <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ShoppingBag className="w-5 h-5" />
                                        Historique des commandes
                                    </CardTitle>
                                    <CardDescription>Consultez vos achats passés et suivez vos commandes</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="text-center py-16">
                                        <div className="w-24 h-24 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <ShoppingBag className="w-12 h-12 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">Aucune commande pour le moment</h3>
                                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                            Découvrez nos produits et passez votre première commande pour voir l'historique ici.
                                        </p>
                                        <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                                            <Link href="/products">
                                                Découvrir nos produits
                                                <Package className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Order Status Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-lg">
                                    <CardContent className="p-6 text-center">
                                        <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                                        <h3 className="font-semibold mb-1">En attente</h3>
                                        <p className="text-sm text-muted-foreground">0 commandes</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-lg">
                                    <CardContent className="p-6 text-center">
                                        <Truck className="w-8 h-8 text-primary mx-auto mb-3" />
                                        <h3 className="font-semibold mb-1">En cours</h3>
                                        <p className="text-sm text-muted-foreground">0 commandes</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-lg">
                                    <CardContent className="p-6 text-center">
                                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                        <h3 className="font-semibold mb-1">Livrées</h3>
                                        <p className="text-sm text-muted-foreground">0 commandes</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Security Tab */}
                        <TabsContent value="security" className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Password Management */}
                                <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Lock className="w-5 h-5" />
                                            Mot de passe
                                        </CardTitle>
                                        <CardDescription>Gérez la sécurité de votre compte</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-4 bg-background/60 rounded-lg border">
                                                <Shield className="w-5 h-5 text-green-600" />
                                                <div>
                                                    <h4 className="font-medium">Mot de passe actuel</h4>
                                                    <p className="text-sm text-muted-foreground">Sécurisé et à jour</p>
                                                </div>
                                            </div>
                                            <Button onClick={handlePasswordReset} variant="outline" className="w-full">
                                                <Edit3 className="mr-2 w-4 h-4" />
                                                Changer le mot de passe
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Account Actions */}
                                <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Settings className="w-5 h-5" />
                                            Actions du compte
                                        </CardTitle>
                                        <CardDescription>Gérez votre session et vos préférences</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-4 bg-background/60 rounded-lg border">
                                                <UserIcon className="w-5 h-5 text-blue-600" />
                                                <div>
                                                    <h4 className="font-medium">Session active</h4>
                                                    <p className="text-sm text-muted-foreground">Connecté depuis {new Date().toLocaleDateString('fr-FR')}</p>
                                                </div>
                                            </div>
                                            <Button onClick={handleLogout} variant="destructive" className="w-full">
                                                <Lock className="mr-2 w-4 h-4" />
                                                Se déconnecter
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Security Tips */}
                            <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="w-5 h-5" />
                                        Conseils de sécurité
                                    </CardTitle>
                                    <CardDescription>Protégez votre compte avec ces bonnes pratiques</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-3 p-4 bg-background/60 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                                            <div>
                                                <h4 className="font-medium">Mot de passe fort</h4>
                                                <p className="text-sm text-muted-foreground">Utilisez au moins 8 caractères avec des chiffres et symboles</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-background/60 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                                            <div>
                                                <h4 className="font-medium">Email vérifié</h4>
                                                <p className="text-sm text-muted-foreground">Votre adresse email est vérifiée et sécurisée</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        )
    }

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative -mt-16 h-[36vh] w-full flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/assets/images/banners/accueil_banner.jpg"
          alt="Connexion & Inscription"
          fill
          sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px"
          className="object-cover -z-20"
          priority
        />
        <div className="absolute inset-0 -z-10 hero-overlay" />
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-black font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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
