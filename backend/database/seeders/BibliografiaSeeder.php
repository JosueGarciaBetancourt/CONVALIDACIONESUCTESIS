<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bibliografia;


class BibliografiaSeeder extends Seeder
{
    public function run(): void
    {
        $bibliografias = [
            // Silabo 1 (Programación I - 2015)
            [
                'idSilabo' => 1,
                'referencia' => 'Deitel, P. J., & Deitel, H. M. (2014). C How to Program (8th ed.). Pearson.',
                'url' => 'https://www.pearson.com/c-how-to-program',
            ],
            [
                'idSilabo' => 1,
                'referencia' => 'Kernighan, B. W., & Ritchie, D. M. (2012). The C Programming Language (2nd ed.). Prentice Hall.',
                'url' => 'https://www.cs.princeton.edu/~bwk/cbook.html',
            ],
            [
                'idSilabo' => 1,
                'referencia' => 'Gottfried, B. S. (2011). Programación en C (3ra ed.). McGraw-Hill.',
                'url' => 'https://www.mheducation.com/programming-in-c',
            ],

            // Silabo 2 (Ingeniería Web - 2018)
            [
                'idSilabo' => 2,
                'referencia' => 'Duckett, J. (2014). HTML and CSS: Design and Build Websites. Wiley.',
                'url' => 'https://www.htmlandcssbook.com/',
            ],
            [
                'idSilabo' => 2,
                'referencia' => 'Nixon, R. (2018). Learning PHP, MySQL & JavaScript (5th ed.). O\'Reilly Media.',
                'url' => 'https://www.oreilly.com/library/view/learning-php-mysql/9781491979075/',
            ],
            [
                'idSilabo' => 2,
                'referencia' => 'Flanagan, D. (2016). JavaScript: The Definitive Guide (6th ed.). O\'Reilly Media.',
                'url' => 'https://www.oreilly.com/library/view/javascript-the-definitive/9781449393854/',
            ],
            [
                'idSilabo' => 2,
                'referencia' => 'MDN Web Docs (2018). HTML, CSS, y JavaScript referencia.',
                'url' => 'https://developer.mozilla.org/es/',
            ],

            // Silabo 3 (Redes - 2024)
            [
                'idSilabo' => 3,
                'referencia' => 'Kurose, J. F., & Ross, K. W. (2023). Computer Networking: A Top-Down Approach (8th ed.). Pearson.',
                'url' => 'https://www.pearson.com/computer-networking',
            ],
            [
                'idSilabo' => 3,
                'referencia' => 'Tanenbaum, A. S., & Wetherall, D. J. (2021). Computer Networks (6th ed.). Pearson.',
                'url' => 'https://www.pearson.com/computer-networks',
            ],
            [
                'idSilabo' => 3,
                'referencia' => 'Stallings, W. (2022). Data and Computer Communications (11th ed.). Pearson.',
                'url' => 'https://www.pearson.com/data-and-computer-communications',
            ],
            [
                'idSilabo' => 3,
                'referencia' => 'Cisco Networking Academy (2023). Introduction to Networks Companion Guide.',
                'url' => 'https://www.ciscopress.com/introduction-to-networks',
            ],

            // Silabo 4 (Programación I - 2016)
            [
                'idSilabo' => 4,
                'referencia' => 'Joyanes Aguilar, L. (2014). Fundamentos de Programación (4ta ed.). McGraw-Hill.',
                'url' => 'https://www.mheducation.es/fundamentos-programacion',
            ],
            [
                'idSilabo' => 4,
                'referencia' => 'Deitel, P. J., & Deitel, H. M. (2015). C++ How to Program (10th ed.). Pearson.',
                'url' => 'https://www.pearson.com/cpp-how-to-program',
            ],
            [
                'idSilabo' => 4,
                'referencia' => 'Cormen, T. H., et al. (2014). Introduction to Algorithms (3rd ed.). MIT Press.',
                'url' => 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition',
            ],

            // Silabo 5 (Web - 2019)
            [
                'idSilabo' => 5,
                'referencia' => 'Simpson, K. (2019). You Don\'t Know JS Yet. O\'Reilly Media.',
                'url' => 'https://github.com/getify/You-Dont-Know-JS',
            ],
            [
                'idSilabo' => 5,
                'referencia' => 'Haverbeke, M. (2018). Eloquent JavaScript (3rd ed.).',
                'url' => 'https://eloquentjavascript.net/',
            ],
            [
                'idSilabo' => 5,
                'referencia' => 'Frain, B. (2019). Responsive Web Design with HTML5 and CSS3 (3rd ed.). Packt Publishing.',
                'url' => 'https://www.packtpub.com/product/responsive-web-design-with-html5-and-css3/9781785882180',
            ],
            [
                'idSilabo' => 5,
                'referencia' => 'W3Schools (2019). HTML, CSS, JavaScript, PHP, SQL referencias y tutoriales.',
                'url' => 'https://www.w3schools.com/',
            ],

            // Silabo 6 (Redes - 2023)
            [
                'idSilabo' => 6,
                'referencia' => 'Cisco Networking Academy (2022). Switching, Routing, and Wireless Essentials Companion Guide.',
                'url' => 'https://www.ciscopress.com/switching-routing-wireless-essentials',
            ],
            [
                'idSilabo' => 6,
                'referencia' => 'Hucaby, D. (2021). CCNA 200-301 Official Cert Guide. Cisco Press.',
                'url' => 'https://www.ciscopress.com/ccna-200-301',
            ],
            [
                'idSilabo' => 6,
                'referencia' => 'Forouzan, B. A. (2022). Data Communications and Networking (5th ed.). McGraw-Hill.',
                'url' => 'https://www.mheducation.com/data-communications-networking',
            ],

            // Silabo 7 (Lógica de programación - 2017)
            [
                'idSilabo' => 7,
                'referencia' => 'Joyanes Aguilar, L. (2016). Algoritmos y Estructuras de Datos: Una perspectiva en C. McGraw-Hill.',
                'url' => 'https://www.mheducation.es/algoritmos-estructuras-datos',
            ],
            [
                'idSilabo' => 7,
                'referencia' => 'Sedgewick, R., & Wayne, K. (2015). Algorithms (4th ed.). Addison-Wesley.',
                'url' => 'https://algs4.cs.princeton.edu/home/',
            ],
            [
                'idSilabo' => 7,
                'referencia' => 'Cairo, O. (2013). Metodología de la programación: Algoritmos, diagramas de flujo y programas (3ra ed.). Alfaomega.',
                'url' => 'https://www.alfaomega.com.mx/metodologia-programacion',
            ],

            // Silabo 8 (Aplicaciones Web - 2020)
            [
                'idSilabo' => 8,
                'referencia' => 'Lockhart, J. (2020). Modern PHP: New Features and Good Practices (2nd ed.). O\'Reilly Media.',
                'url' => 'https://www.oreilly.com/library/view/modern-php/9781491905173/',
            ],
            [
                'idSilabo' => 8,
                'referencia' => 'Freeman, A. (2020). Pro Angular 9: Build Powerful and Dynamic Web Apps. Apress.',
                'url' => 'https://www.apress.com/pro-angular-9',
            ],
            [
                'idSilabo' => 8,
                'referencia' => 'Krug, S. (2018). Don\'t Make Me Think, Revisited: A Common Sense Approach to Web Usability (3rd ed.). New Riders.',
                'url' => 'https://www.nngroup.com/books/dont-make-me-think/',
            ],
            [
                'idSilabo' => 8,
                'referencia' => 'Stauffer, M. (2019). Laravel: Up & Running (2nd ed.). O\'Reilly Media.',
                'url' => 'https://www.oreilly.com/library/view/laravel-up/9781492041207/',
            ],

            // Silabo 9 (Fundamentos de redes - 2024)
            [
                'idSilabo' => 9,
                'referencia' => 'Cisco Networking Academy (2023). Networking Essentials Course Booklet.',
                'url' => 'https://www.ciscopress.com/networking-essentials',
            ],
            [
                'idSilabo' => 9,
                'referencia' => 'Kurose, J. F., & Ross, K. W. (2022). Computer Networking: A Top-Down Approach (8th ed.). Pearson.',
                'url' => 'https://www.pearson.com/computer-networking',
            ],
            [
                'idSilabo' => 9,
                'referencia' => 'Meyers, M. (2023). CompTIA Network+ Certification All-in-One Exam Guide (8th ed.). McGraw-Hill.',
                'url' => 'https://www.mheducation.com/comptia-network-plus',
            ],
            [
                'idSilabo' => 9,
                'referencia' => 'White, C. M. (2023). Data Communications and Computer Networks: A Business User\'s Approach (9th ed.). Cengage Learning.',
                'url' => 'https://www.cengage.com/data-communications-networks',
            ],
            // Curso de prueba
            [
                'idSilabo' => 10,
                'referencia' => 'PRUEBA, C. M. (2023). Data Communications and Computer Networks: A Business User\'s Approach (9th ed.). Cengage Learning.',
                'url' => 'https://www.pruebasilabo10.com',
            ],
            [
                'idSilabo' => 10,
                'referencia' => 'PRUEBA XD, C. M. (2023). Data Communications and Computer Networks: A Business User\'s Approach (9th ed.). Cengage Learning.',
                'url' => 'https://www.pruebasilabo10.com.pe',
            ],
        ];

        foreach ($bibliografias as $bibliografia) {
            Bibliografia::create($bibliografia);
        }
    }
}