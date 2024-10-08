num1 = 1
num2= 2
num3 = 3


    soma = num1 + num2 + num3
    subt = num1 - num2 - num3
    multi = num1 * num2 * num3
    divi = (num1 + num2) / num3


    print("O resultado da soma é:"..soma)
    print("O resultado da subtração é:"..subt)
    print("O resultado da multiplicação é:"..multi)
    print("O resultado da divisão é:"..divi)


n1 = 6
n2 = 11


function soma(n1, n2)
   return (n1 + n2)   
end


print(soma(n1, n2))


n = 17


if n > 10 then
   print("Maior que 10")
else
   print("Menor ou igual a 10")


end


local n = {2, 4, 6, 8, 10}


table.insert(n, 12)
table.insert(n, 14)
table.remove(n, 2)


local list = {"Amarelo", "Vermelho","Azul","Verde","Roxo","Anil"}


print("Lista de cores:")
for i = 1, #list do
   print(list[i])
end



local n = 4
local fat = 1


while n > 1 do
   fat = fat * n
   n = n - 1
end


print("Resultado:"..fat)


local nome = "Giovanna"


print("O nome",nome,"possui",string.len(nome),"caracteres.")


local nome = "Giovanna"


function reverso(nome)
   return string.reverse(nome)
end
print("O nome",nome,"ao contrario é",reverso(nome))  


local pessoa = {
   nome = "Livia",
   idade = 17,
   profissao = "Desempregada"
}
print("Nome:"..pessoa.nome)
print("Idade:"..pessoa.idade)
print("Profissão:"..pessoa.profissao)



function Calcular(n1, n2, operador)
   operador = operador or "+"
  
   if operador == "+" then
       return n1 + n2
       elseif operador == "-" then
           return n1 - n2
           elseif operador == "*" then
               return n1 * n2
               elseif operador == "/" then
                   if n2 ~=0 then
                       return n1 / n2
                   else
                       return "Erro!"
                   end
   end
end


local matriz = {
   {1,2,3},
   {4,5,6},
   {7,8,9}
}


for i = 1, 3 do
   for j = 1, 3 do
       print("Elemento["..i.."]["..j.."] = "..matriz[i][j])
   end
end

local mensagem = function ()
   print("Função anônima em Lua")
end


mensagem()


local function verificar (n)
   if n % 2 ==0 then
       return "O número" .. n .. "é par."
   else
       return "O número" ..n.. "é ímpar."
   end
end


print(verificar(10))
print(verificar(7))


local n = {23, 5,98, 13, 32, 1, 66}


table.sort(n)


for i = 1, #n do
   print(n[i])
end

local function contarP (text)
   text = text:match("^%s*(.-)%s*$")


   if text == "" then
       return 0
   end


   local palavras = {}
   for palavras in text:gmatch("%S+") do
       table.insert(palavras, palavras)
   end
   return #palavras
end


print(contarP("Olá, como você está?"))
print(contarP("Edson e a minha coxinha?"))
print(contarP(" "))
