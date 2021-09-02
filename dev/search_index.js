var documenterSearchIndex = {"docs":
[{"location":"functions/#Functions","page":"Functions","title":"Functions","text":"","category":"section"},{"location":"functions/","page":"Functions","title":"Functions","text":"DocTestSetup = quote\n    using LLLplus\n    using LinearAlgebra\nend","category":"page"},{"location":"functions/","page":"Functions","title":"Functions","text":"    lll\n    cvp\n    svp\n    brun\n    gauss\n    seysen\n    vblast\n    subsetsum\n    lagariasodlyzko\n    mdsubsetsum\n    integerfeasibility\n    rationalapprox\n    spigotBBP\n    hkz\n    ishkzreduced\n    issizereduced\n    islllreduced\n    orthogonalitydefect\n    hermitefactor\n    seysencond\n    gen_qary_b","category":"page"},{"location":"functions/#LLLplus.lll","page":"Functions","title":"LLLplus.lll","text":"B,T,Q,R = lll(H,δ=3/4)\n\nDo Lenstra–Lenstra–Lovász lattice reduction of matrix H using optional parameter δ.  The output is B, an LLL-reduced basis; T, a unimodular (meaning det(T)=+/-1) transformation matrix such that B= H*T; and finally Q and R which are a QR decomposition of B.  So H = B*inv(T) = Q*R*inv(T).\n\nFollows D. Wuebben, et al, \"Lattice Reduction - A Survey with Applications in Wireless Communications\", IEEE Signal Processing Magazine, Apr 2011.  http://www.ant.uni-bremen.de/sixcms/media.php/102/10740/SPM2011Wuebben.pdf\n\nThe LLL tecnique was originally described in \"Factoring polynomials with rational coefficients\" by A. K. Lenstra, H. W. Lenstra Jr. and L. Lovász, Mathematische Annalen 261, 1982. http://ftp.cs.elte.hu/~lovasz/scans/lll.pdf\n\nExamples\n\njulia> H= [1 2; 3 4];B,_ = lll(H); B\n2×2 Matrix{Int64}:\n 1  -1\n 1   1\n\njulia> H= BigFloat.([1.5 2; 3 4]) .+ 2im; B,_= lll(H); B\n2×2 Matrix{Complex{BigFloat}}:\n 0.50+0.0im  0.0+1.0im\n  1.0+0.0im  0.0+0.0im\n\njulia> N=500;H = randn(N,N); B,T = lll(H);\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.cvp","page":"Functions","title":"LLLplus.cvp","text":"x=cvp(y,R)\n\nSolve the problem argmin_x ||y-Rx|| for integer x using the technique from the paper below. The input vector y is of length n, with upper triangular R of dimension n by n, and the returned vector x of length n.\n\nx=cvp(y,R,infinite=Val(true),Umax=-1,Umax=-Umin,nxMax=Int(ceil(log2(n)*1e6)))\n\nIf infinite==Val(true) then we search the (infinite) lattice, otherwise we search integers in [Umin,Umax]. When nxMax is included, it gives a maximum number of steps to take, otherwise a heuristic value is used. Note that cvp does not handle complex numbers.\n\nFollows \"Faster Recursions in Sphere Decoding\" Arash Ghasemmehdi, Erik Agrell, IEEE Transactions on Information Theory, vol 57, issue 6 , June 2011.\n\nExamples\n\njulia> H=[1 2; 3 4]; Q,R=qr(H); uhat = cvp(Q'*[0,2],R)\n2-element Vector{Float64}:\n  2.0\n -1.0\n\njulia> uhat = cvp(Q'*[0,2],R,Val(false),0,100)\n2-element Vector{Float64}:\n 1.0\n 0.0\n\njulia> n=100;H=randn(n,n);Q,R=qr(H);\n\njulia> u=Int.(rand(0:1e10,n));y=H*u+rand(n)/100;\n\njulia> uhat=cvp(Q'*y,R); sum(abs.(u-uhat))\n0.0\n\njulia> n=500;H=randn(n,n);Q,R=qr(H);\n\njulia> u=Int.(rand([-1,1],n));y=H*u+rand(n)/100;\n\njulia> uhat=cvp(Q'*y,R,Val(false),-1,1); sum(abs.(u-uhat))\n0.0\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.svp","page":"Functions","title":"LLLplus.svp","text":"x=svp(B)\n\nFind the shortest basis vector b for the lattice formed by the matrix B. This solves the 'shortest vector problem' (SVP). Note that svp does not handle complex numbers.\n\nFollows \"Algorithm SHORTESTVECTOR(G)\" from \"Closest Point Search in Lattices\" by Erik Agrell, Thomas Eriksson, Alexander Vardy, and Kenneth Zeger in IEEE Transactions on Information Theory, vol. 48, no. 8, August 2002.\n\nExamples\n\njulia> H=[1 2; 3 4]; svp(H)\n2-element Vector{Int64}:\n -1\n -1\n\njulia> H = [1 0 0 0;   0 1 0 0;   208 175 663 0;     651 479 0  663];\n\njulia> svp(H)\n4-element Vector{Int64}:\n  16\n -19\n   3\n -11\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.brun","page":"Functions","title":"LLLplus.brun","text":"B, T = brun(H)\n\nBrun's integer-relations alg implemented as a matrix decomposition. Takes as input the matrix H and returns a reduced basis B and T, a unimodular transformation matrix such that B = H*T. Brun reduction is often done with pinv(H) as input to yield B = pinv(H)*T.\n\nSee V. Brun, \"En generalisation av kjedebrøken I,\" Skr. Vid ensk. Selsk. Kristiana, Mat. Nat. Klasse, 1919.  See https://archive.org/stream/skrifterutgitavv201chri#page/300/mode/2up\n\nFollows code from D. Wuebben, D. Seethaler, J. Jalden, and G. Matz, \"Lattice Reduction - A Survey with Applications in Wireless Communications\" IEEE Signal Processing Magazine, March 2011\n\nExamples\n\njulia> H=[1 2; 3 4]; B,T=brun(H); T\n2×2 Matrix{Int64}:\n  3  -1\n -2   1\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.gauss","page":"Functions","title":"LLLplus.gauss","text":"B = gauss(H)\n\nDo Gauss/Lagrange reduction on the lattice defined by the two columns of H.\n\nFollows Fig 2.3 of \"Lattice Basis Reduction: An Introduction to the LLL Algorithm and Its Applications\" by Murray R. Bremner, CRC Press, 2012.\n\nExamples\n\njulia> H = [1 2; 3 3]; B = gauss(H)\n2×2 Matrix{Float64}:\n 1.0  0.0\n 0.0  3.0\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.seysen","page":"Functions","title":"LLLplus.seysen","text":"B,T,B_dual,num_it = seysen(H::Array{Td,2}) where Td\n\nDo greedy  Seysen lattice reduction  on the  matrix H, returning  B, the reduced lattice basis;  T a unimodular matrix that reduces  H (i.e. B = H*T); B_dual, dual lattice basis (i.e., B_dual = pinv(B)); and num_it the number of iterations (basis updates). See also lll.\n\nFollows Seysen algorithm in \"Lattice Reduction - A Survey with Applications in Wireless Communications\" by D. Wuebben, et al, IEEE Signal Processing Magazine, 2011.\n\nTechnique originally described in \"Simultaneous reduction of a lattice basis and its reciprocal basis\" by M. Seysen, Combinatorica, 1993. http://link.springer.com/article/10.1007%2FBF01202355\n\nExamples\n\njulia> H= [1 2; 3 4];B,T = seysen(H); B\n2×2 Matrix{Int64}:\n -1  1\n  1  1\n\njulia> H= BigFloat.([1.5 2; 3 4]) .+ 2im; B,_= seysen(H); B\n2×2 Matrix{Complex{BigFloat}}:\n 0.0+1.0im  0.50+0.0im\n 0.0+0.0im   1.0+0.0im\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.vblast","page":"Functions","title":"LLLplus.vblast","text":"W,P,B = vblast(H)\n\nFind a VBLAST decomposition of H such that H = pinv(W)*B*P' or B = W*H*P.  Here P is a permutation matrix, B is lower triangular with ones on the diagonal, and W has orthogonal rows.\n\nW,P,B = vblast(H,mu)\n\nIf an SNR argument mu is passed in, a regularized (\"MMSE\") decomposition is done, with the result that W will no longer have orthogonal rows and B is no longer lower triangular.\n\nExamples\n\njulia> H= [1. 2; 3 4];W,_ = vblast(H); W\n2×2 Matrix{Float64}:\n 1.5  -0.5\n 0.1   0.3\n\njulia> H= BigFloat.([1.5 2; 3 4]) .+ 2im; W,_= vblast(H); W\n2×2 Matrix{Complex{BigFloat}}:\n      -2.0+3.0im            2.0-1.5im     \n 0.0779221-0.103896im  0.155844-0.103896im\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.subsetsum","page":"Functions","title":"LLLplus.subsetsum","text":"x = subsetsum(a,s)\n\nFor a vector of integers a, and an integer s, try to find a binary vector x such that x'*a=s. We use the LLL algorithm to find the solution. This is not a robust tool, just a demo.\n\nThis function tries first the technique in the lagariasodlyzko function, and if it fails, a solution via mdsubsetsum is attempted.\n\nIt appears that this function can also solve some integer relations problems. See the first example.\n\nExamples\n\njulia> a=[1.5;.5;0;.1;.2]; s=2.2; x,_=subsetsum(a,s,true); s-x'*a\nA binary Lagarias-Odlyzko solution was found.\nA solution was found via lagariasodlyzko\n0.0\n\njulia> a=[32771,65543,131101,262187,524387,1048759, # from Bremner p 117\n          2097523,4195057,8390143,16780259,33560539,\n          67121039,134242091,268484171,536968403];\n\njulia> s=891221976; x,_=subsetsum(a,s,false); s-x'*a\n0.0\n\njulia> N=40;a=rand(1:2^BigInt(256),N);xtrue=rand(Bool,N); s=a'*xtrue; \n\njulia> setprecision(BigFloat,300); x,_=subsetsum(a,s,false); s-x'*a\n0.0\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.lagariasodlyzko","page":"Functions","title":"LLLplus.lagariasodlyzko","text":"x = lagariasodlyzko(a,s)\n\nFor a vector of integers a, and an integer s, try to find a binary vector x such that x'*a=s. We use the LLL algorithm to find the solution. This is not a robust tool, just a demo.\n\nThis follows the technique described by Lagarias and Odlyzko  in  \"Solving Low-Density Subset Sum Problems\"  in Journal of ACM, Jan 1985. Code based on http://web.eecs.umich.edu/~cpeikert/lic15/lec05.pdf We can likely get better results using techniques described and referenced in https://www-almasty.lip6.fr/~joux/pages/papers/ToolBox.pdf\n\nIt's odd that permuting the a vector in the second example given below causes the alg to often not find a binary solution. Apparently this is a common oddity with lattice solvers.\n\nExamples\n\njulia> a=[1.5;.5;0;.1;.2]; s=2.2; x,_=lagariasodlyzko(a,s); s-x'*a\n0.0\n\njulia> a=[32771,65543,131101,262187,524387,1048759, # from Bremner p 117\n          2097523,4195057,8390143,16780259,33560539,\n          67121039,134242091,268484171,536968403];\n\njulia> s=891221976; x,_=lagariasodlyzko(a,s); s-x'*a\n0.0\n\njulia> N=40;a=rand(1:2^BigInt(256),N);xtrue=rand(Bool,N); s=a'*xtrue; \n\njulia> setprecision(BigFloat,300); x,_=lagariasodlyzko(a,s); s-x'*a\n0.0\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.mdsubsetsum","page":"Functions","title":"LLLplus.mdsubsetsum","text":"x = mdsubsetsum(a,sM,ratio=.5,Kpm=3)\n\nFor a vector of integers a, and an integer sM, try to find a binary vector x such that x'*a=s using the technique from \"Multidimensional subset sum problem\" [1][2]. A major goal of the technique is to solve problems in which there are about 50% ones in x; other ratios of ones to zeros can be specified in ratio.  The thesis also suggests searching Kpm=3 values around the nominal k. This technique is related to that in subsetsum in that both use the LLL algorithm.  This is not a robust tool, just a demo.\n\n[1] https://scholarworks.rit.edu/theses/64/\n\n[2] https://pdfs.semanticscholar.org/21a7/c2f9ff29507f1153aefcca04d1cd308e45c0.pdf\n\nExamples\n\njulia> a=[1.5;.5;0;.1;.2]; s=2.2; x=mdsubsetsum(a,s); s-x'*a\n0.0\n\njulia> a=[32771,65543,131101,262187,524387,1048759, # from Bremner p 117\n          2097523,4195057,8390143,16780259,33560539,\n          67121039,134242091,268484171,536968403];\n\njulia> sM=891221976; x=mdsubsetsum(a,sM); sM-x'*a\n0\n\njulia> setprecision(BigFloat,300); Random.seed!(0);\n\njulia> N=40;a=rand(1:2^BigInt(256),N);xtrue=rand(Bool,N); s=a'*xtrue;\n\njulia> x=mdsubsetsum(a,s); s-x'*a\n0\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.integerfeasibility","page":"Functions","title":"LLLplus.integerfeasibility","text":"integerfeasibility(A,d)\n\nGiven a linear system Ax=d, return an integer vector x which satisfies the system.\n\nintegerfeasibility(A,d,true)\n\nIf the third argument is present and is true, then as well as returning a solution x, also return a matrix xNull of vectors in the null space of A which could be added to the x vector to find a solution which satisfies a constraint such as 0 .≤ x .≤ u; see the paper below.\n\nThis is not a robust tool, just a demo.\n\n\"Solving A System Of Diophantine Equations With Bounds On The Variables\" by Karen Aardal, Cor Hurkens, and Arjen Lenstra in Integer Programming and Combinatorial Optimization, 6th International IPCO Conference, vol 1412, pp 229-242, 1998. See http://softlib.rice.edu/pub/CRPC-TRs/reports/CRPC-TR98782.pdf\n\nExamples\n\njulia> A=[10 1 -9; 1 8 8]; xtrue=[0; 2; 9]; d=A*xtrue;\n\njulia> integerfeasibility(A,d)\n3-element Vector{Int64}:\n 0\n 2\n 9\n\njulia> A=[10 1.1 -9.1; 1 8 8]; d=A*xtrue;\n\njulia> integerfeasibility(A,d)\n3-element Vector{Float64}:\n 0.0\n 2.0\n 9.0\n\njulia> n=20;m=30; A = rand(-10:10,n,m); xtrue = rand(0:10,m); d=A*xtrue;\n\njulia> sum(abs.(xtrue - integerfeasibility(A,d) ))\n0\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.rationalapprox","page":"Functions","title":"LLLplus.rationalapprox","text":"rationalapprox(x::AbstractArray{<:Real,1},M,Ti=BigInt,verbose=false)\n\nFor a vector of Reals x, and an integer M, find an integer q such that maximum(abs.(x*q-round.(x*q))) is small; the vector x is approximated by round.(x*q)//q.  The integer q is less than or equal to M and the approximation satisfies max(abs.(x*q-round.(x*q)))≤sqrt(5)*2^(n/4 - 5)*M^(-1/n); this equation comes from the paper below.  The LLL algorithm reduction is used to find the solution. The approximation vector is returned. This is also known as \"simultaneous diophantine approximation\"; see for example the title of the Hanrot paper below.\n\nThis is not a robust tool, just a demo.\n\n\"LLL: A Tool for Effective Diophantine Approximation\" by Guillaume Hanrot in the book \"The LLL Algorithm: Survey and Applications\" edited by Phong Q. Nguyen and Brigitte Vallée, Springer, Heidelberg, 2010.\n\nSee also Chapter 9 of M. R. Bremner, \"Lattice Basis Reduction: An Introduction to the LLL Algorithm and Its Applications\" CRC Press, 2012.\n\nExamples\n\njulia> x = [0.3912641745333527; 0.5455179974014548; 0.1908698210882469];\n\njulia> rationalapprox(x,1e4,Int64)\n3-element Vector{Rational{Int64}}:\n 43//110\n  6//11\n 21//110\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.spigotBBP","page":"Functions","title":"LLLplus.spigotBBP","text":"spigotBBP(α::Td,s,b,n,K,verbose=false) where {Td}\n\nCheck for a BBP-style [1] infinite series for the constant α.  These are \"spigot\" formulas that can be used to generate (for example) the millionth digit of the constant α without learning the previous digits. Specifically, given the constant α, and parameters b, n, and s, look for a vector of numbers a_1 through a_n that satisfies the following equation:\n\nalpha= sum_k=0^infty frac1b^k left( fraca_1(nk+1)^s + ldots + fraca_n(nk+n)^s right)\n\nBecause it's hard to sum to infinity, the sum is stopped at K. If a formula is found, it is printed to the screen in LaTeX and the coefficents a are returned as a vector.  An online LaTeX viewer such as https://www.latex4technics.com/ may be helpful.\n\nThis is not a robust tool, just a demo. For example, there may be a  problem with s≥2. See [2] for derivation of the technique used, and to  check whether a formula you find is new.\n\n[1] David Bailey, Peter Borwein, and Simon Plouffe. \"On the rapid computation of various polylogarithmic constants.\" Mathematics of Computation 66.218 (1997): 903-913. https://www.ams.org/journals/mcom/1997-66-218/S0025-5718-97-00856-9/\n\n[2] David Bailey, \"A Compendium of BBP-Type Formulas for Mathematical Constants\". https://www.davidhbailey.com//dhbpapers/bbp-formulas.pdf\n\nExample\n\njulia> spigotBBP(BigFloat(pi),1,16,8,45,true);\nA solution was found w error -4.728672e-60. In LaTeX form it is\n\\alpha= \\sum_{k=0}^\\infty \\frac{1}{16^k} \\left(\\frac{4}{8k+1}-\\frac{2}{8k+4}-\\frac{1}{8k+5}-\\frac{1}{8k+6}\\right)\n\nOther examples without output:\n\nspigotBBP(Float64(pi),1,-4,4,22,true);\nspigotBBP(log(2),1,2,2,30,true);\nspigotBBP(9*log(3),1,9,2,30,true);\nspigotBBP(atan(2)*8,1,16,8,30,true);\nspigotBBP(8*sqrt(2)*log(1+sqrt(2)),1,16,8,25,true);\n\nThere is a formula for pi^2 which the following command should find, but it does not find it. In fact the technique doesn't seem to work at all for  s>2; It's not obvious what the problem is\n\nspigotBBP(BigFloat(pi)*pi,2,64,6,25,true);\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.hkz","page":"Functions","title":"LLLplus.hkz","text":"B,T=hkz(H)\n\nDo Hermite-Korkine-Zolotarev (HKZ) reduction of the basis H, returning the reduced basis B and the unimodular rotation T such that B = H*T. HKZ reduction is sometimes called \"Hermite-Korkine-Zolotareff\" or \"Korkine-Zolotareff\" reduction.\n\nBased on \"Practical HKZ and Minkowski Lattice Reduction Algorithms\" by Wen Zhang, Sanzheng Qiao, and Yimin Wei, 17 Aug. 2011. http://www.cas.mcmaster.ca/~qiao/publications/ZQW11.pdf\n\nExamples\n\njulia> H=[1 2; 3 4];\n\njulia> B,T= hkz(H); B\n2×2 Matrix{Int64}:\n  1  -1\n -1  -1\n\njulia> N=9; H=rand(0:10,N,N); B,_=hkz(H);\n\njulia> ishkzreduced(B)\ntrue\n\njulia> A = [10.6347 -66.2715  9.3046 17.5349 24.9625 # From\n                0     8.6759 -4.7536 -3.9379 -2.3318 # TransIT, v65,\n                0        0    0.3876  0.1296 -0.2879 # n3, Mar 2019,\n                0        0    0       0.0133 -0.0082 # p 1929.\n                0        0    0       0       0.0015];\n\njulia> B,_= hkz(A); # our HKZ doesn't work well on A ...\n\njulia> ishkzreduced(B) # ...because A is ill-conditioned\nfalse\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.ishkzreduced","page":"Functions","title":"LLLplus.ishkzreduced","text":"ishkzreduced(B)\n\nDetermine if the matrix B is Hermite-Korkine-Zolotarev (HKZ) reduced or not. See the hkz function.\n\nExamples\n\njulia> H= [1 2; 3 4];ishkzreduced(H)\nfalse\n\njulia> B,_=hkz(H); ishkzreduced(B)\ntrue\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.issizereduced","page":"Functions","title":"LLLplus.issizereduced","text":"issizereduced(B)\n\nDetermine if the matrix B is size reduced or not.\n\nExamples\n\njulia> H= [1 2; 3 4];issizereduced(H)\nfalse\n\njulia> B,T = lll(H);issizereduced(B)\ntrue\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.islllreduced","page":"Functions","title":"LLLplus.islllreduced","text":"islllreduced(B)\n\nDetermine if the matrix B is LLL reduced or not. See p 56 of Bremner for a definition. \n\nM. R. Bremner, \"Lattice Basis Reduction: An Introduction to the LLL  Algorithm and Its Applications\" CRC Press, 2012.\n\nExamples\n\njulia> H= [1 2; 3 4];islllreduced(H)\nfalse\n\njulia> B,T=lll(H);islllreduced(B)\ntrue\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.orthogonalitydefect","page":"Functions","title":"LLLplus.orthogonalitydefect","text":"orthogonalitydefect(B)\n\nFind the orthogonality defect of the matrix B defined, for example, on page 2 of Bennet:\n\n\"An Enumeration Technique for Lattice Basis Reduction\" Huck Bennet, 2 Nov\n\nhttps://web.eecs.umich.edu/~hdbco/publications/bases.pdf\n\nExamples\n\njulia> H= [1 2; 3 4];B,T=lll(H);\n\njulia> [orthogonalitydefect(H) orthogonalitydefect(B)]\n1×2 Matrix{Float64}:\n 7.07107  1.0\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.hermitefactor","page":"Functions","title":"LLLplus.hermitefactor","text":"hermitefactor(B)\n\nFind the Hermite factor of matrix B\n\nExamples\n\njulia> H= [1 2; 3 4];hermitefactor(H)\n1.5811388300841898\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.seysencond","page":"Functions","title":"LLLplus.seysencond","text":"seysencond(B)\n\nSeysen condition number as on, for example, page 3 of Bennet \n\nBennet\n\nExamples\n\njulia> H= [1 2; 3 4];seysencond(H)\n2.8284271247461903\n\n\n\n\n\n\n","category":"function"},{"location":"functions/#LLLplus.gen_qary_b","page":"Functions","title":"LLLplus.gen_qary_b","text":"b= gen_qary_b(T, d::Int,k::Int,b::Int)\n\nGenerate a q-ary lattice given an element type T, dimension d, parameter k, and bit-depth b. Specifically, find a d by d matrix which has the block structure [I zeros(T,k,d-k); H q*I]], where the k by d-k matrix H is sampled from 0:q-1 and q is sampled uniformly from 1:big(2)^b-1\n\nThese bases correspond to the SIS/LWE q-ary lattices; see D. Micciancio and O. Regev. Post-Quantum Cryptography. Chapter of Lattice-based Cryptography, 147-191 (2009) and latticegen in https://github.com/fplll/fplll\n\nExamples\n\njulia> b=gen_qary_b(Int64,2,1,6)\n2×2 Matrix{Int64}:\n 1   0\n 7  32\n\n\n\n\n\n\n","category":"function"},{"location":"#LLLplus-README","page":"Home","title":"LLLplus README","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = LLLplus","category":"page"},{"location":"","page":"Home","title":"Home","text":"LLLplus provides lattice tools such as Lenstra-Lenstra-Lovász (LLL) lattice reduction. This class of tools are of practical and theoretical use in cryptography, digital communication, and integer programming. This package is experimental and not a robust tool; use at your own risk :-)","category":"page"},{"location":"","page":"Home","title":"Home","text":"LLLplus provides functions for LLL, Seysen, and Hermite-Korkine-Zolotarev lattice reduction techniques. Brun integer relations is included in the form of lattice reduction. Solvers for the shortest vector and the closest vector problems are also included; for more see the help text for the lll, seysen, hkz, brun, svp, and cvp functions. Several toy (demo) functions are also included; see the  subsetsum, integerfeasibility, rationalapprox, and  spigotBBP functions.","category":"page"},{"location":"#Examples","page":"Home","title":"Examples","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Each function contains documentation and examples available via Julia's built-in documentation system, for example with ?lll. Documentation for all functions is available. A tutorial notebook is found in the docs directory or on nbviewer.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Here are a few examples of using the functions in the package on random lattices.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Pkg.add(\"LLLplus\")\nusing LLLplus\n\n# do lattice reduction on a matrix with randn entries\nN = 100;\nH = randn(N,N);\nB,T = brun(H);\nB,T = lll(H);\nB,T = seysen(H);\n\n# check out the CVP solver\nQ,R=qr(H);\nu=Int.(rand(0:1e10,N));\ny=H*u+rand(N)/100;\nuhat=cvp(Q'*y,R);\nsum(abs.(u-uhat))","category":"page"},{"location":"#Execution-Time-results","page":"Home","title":"Execution Time results","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"In the first test we compare the lll function from LLLplus, the l2avx function in the src\\l2.jl file in LLLplus, the lll_with_transform function from Nemo (which uses FLINT), and the lll_reduction function from fplll. Nemo and fplll are written by number theorists and are good benchmarks against which to compare.  We first show how the execution time varies as the basis (matrix) size varies over [4 8 16 32 64]. For each matrix size, 20 random bases are generated using fplll's gen_qary function with depth of 25 bits, with the average execution time shown; the eltype is Int64 except for NEMO, which uses GMP (its own BigInt); in all cases the δ=.99. The vertical axis shows execution time on a logarithmic scale; the x-axis is also logarithmic. The generally linear nature of the LLL curves supports the polynomial-time nature of the algorithm. The LLLplus.lll function is slower, while l2avx is similar to fplll. Though not shown, using bases from gen_qary with bit depth of 45 gives fplll a larger advantage. This figure was generated using code in test/timeLLLs.jl.","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: Time vs basis size)","category":"page"},{"location":"","page":"Home","title":"Home","text":"One question that could arise when looking at the plot above is what the quality of the basis is. In the next plot we show execution time vs the norm of the first vector in the reduced basis, this first vector is typically the smallest; its norm is an rough indication of the quality of the reduced basis. We show results averaged over 20 random bases from gen_qary with depth 25 bits, this time with the dimension fixed at 32. The curve is created by varying the δ parameter from .29 to .99 in steps of .2; the larger times and smaller norms correspond to the largest δ values. Though the l2avx function is competitive with fplll in this case, in most cases the fplll code is faster.","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: Time vs reduction quality)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Finally, we show execution time for several built-in datatypes (Int32, Int64, Int128, Float32, Float64, BitInt, and BigFloat) as well as type from external packages (Float128 from Quadmath.jl and Double64 from DoubleFloat.jl) which are used to  generate 60 16x16 matrices, over which execution time for the lattice reduction techniques is averaged.  The vertical axis is a logarithmic representation of execution time as in the previous figure. This figure was generated using code in test/perftest.jl.","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: Time vs data type)","category":"page"},{"location":"#Notes","page":"Home","title":"Notes","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The 2020 Simons Institute lattice workshop, a survey paper by Wuebben, and the monograph by Bremner  were helpful in writing the tools in LLLplus and are a good resource for further study. If you are trying to break one of the Lattice Challenge records or are looking for robust, well-proven lattice tools, look at fplll. Also, for many number-theoretic problems the Nemo.jl package is appropriate; it uses the FLINT C library to do LLL reduction on Nemo-specific data types.  Finally, no number theorists have worked on LLLplus; please treat the package as experimental.","category":"page"}]
}
