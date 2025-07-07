---
date: 2023-06-05
authors: amiller
description: >-
  PowerShell is a powerful scripting language and command-line shell that is
  widely used for automation, administration, and managing Windows environments.
---

# 🔡 PowerShell Cheat Sheet: Essential Commands for Efficient Scripting

PowerShell is a powerful scripting language and command-line shell that is designed specifically for system administration and automation tasks in Windows environments. Whether you're a seasoned sysadmin or just starting with PowerShell, having a cheat sheet of essential commands at your fingertips can greatly enhance your productivity. In this blog post, we will cover some fundamental PowerShell commands, starting from the basics and gradually progressing to more advanced concepts.

<!-- truncate -->

## Powershell Introduction and Basics

### Set-ExecutionPolicy

The [Set-ExecutionPolicy](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7.3) command allows you to manage the script execution policy on your system. It determines whether PowerShell scripts can be run and helps ensure system security. Here's an example of setting the execution policy to allow running scripts.

```powershell
Set-ExecutionPolicy Unrestricted
```

:::info
If you have not yet run Powershell on your computer and are getting errors because of permissions, you likely need to run the [Set-ExecutionPolicy](powershell-cheat-sheet-essential-commands-for-efficient-scripting.md#set-executionpolicy) command.
:::

### Powershell Piping

[PowerShell piping](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about\_pipelines?view=powershell-7.3) is a powerful feature that allows you to take the output of one command (or cmdlet) and use it as input for another command. It enables you to chain together multiple commands to perform complex operations with ease.

To understand piping, let's consider a simple example. Suppose you want to retrieve a list of running processes on your computer using the `Get-Process` command. By default, running `Get-Process` will display a table showing various details about the processes. However, what if you only want to see the processes related to a specific application, such as "chrome"?

In a non-piping scenario, you might need to run a separate command to filter the results manually. However, with PowerShell piping, you can achieve this in a more straightforward way. Here's an example:

```powershell
Get-Process | Where-Object { $_.Name -eq "chrome" }
```

Let's break down this example step by step:

1. `Get-Process`: This command retrieves a list of all running processes on your computer.
2. `|`: The vertical pipe character (`|`) is the piping operator in PowerShell. It takes the output from the left side and passes it as input to the command on the right side.
3. `Where-Object`: This command is used to filter objects based on specific criteria. In this case, we want to filter the processes based on their name.
4. `{ $_.Name -eq "chrome" }`: This is a script block, which is essentially a piece of code enclosed within curly braces. It specifies the condition we want to use for filtering. Here, we're checking if the process name (`$_.Name`) is equal to "chrome". The `$_` is an [automatic variable](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about\_automatic\_variables?view=powershell-7.3) referencing the current object in the pipeline.

By using the piping operator, we can take the output of `Get-Process` and directly pass it to `Where-Object` for further processing. As a result, only the processes with the name "chrome" will be displayed.

Piping can be used with multiple commands, allowing you to perform complex operations in a single line. You can chain together as many commands as needed, each building upon the output of the previous one.

### Get-Alias

[Get-Alias](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-alias?view=powershell-7.3) retrieves the list of aliases (shortcuts) for PowerShell commands. It helps you understand and use PowerShell shortcuts effectively. Here's an example of retrieving all the aliases:

```powershell
Get-Alias

--- Output ---
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Alias           % -> ForEach-Object
Alias           ? -> Where-Object
...
```

### Where-Object

[Where-Object](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/where-object?view=powershell-7.3) filters objects based on specified criteria. It's handy for selecting specific data from a collection. Here's an example (using the Where-Object [alias](powershell-cheat-sheet-essential-commands-for-efficient-scripting.md#get-alias)) of filtering processes based on their name:

```powershell
Get-Process |? { $_.name -eq "chrome" }
```

### Setting Environment Variables

To set environment variables within a PowerShell session, you can use the `$env:` notation. Here's an example of how to set an environment variable:

```powershell
$env:MY_CUSTOM_VARIABLE= "Hello, World!"
```

## Powershell Commands

### Get-Process

[Get-Process](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-process?view=powershell-7.3) retrieves information about the running processes on your computer. It's an excellent command for monitoring and managing processes. The top 10 processes utilizing highest CPU:

```powershell
Get-Process | Sort-Object -Property CPU -Descending | Select-Object -First 10
```

### Stop-Process

[Stop-Process](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/stop-process?view=powershell-7.3) terminates a running process. It allows you to end processes gracefully or forcefully if needed. Here's an example of forcefully stopping a process using its process ID (PID):

```powershell
Stop-Process -ID 1234 -Force
```

### Get Service

[Get-Service](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-service?view=powershell-7.3) retrieves information about services running on your system. It's helpful for managing and monitoring services. Here's an example of retrieving all the running services:

```powershell
Get-Service | Where-Object {$_.Status -eq "Running"}
```

### Stop-Service

[Stop-Service](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/stop-service?view=powershell-7.3) stops a running service. It helps you manage services effectively. Here's an example (using [Powershell piping](powershell-cheat-sheet-essential-commands-for-efficient-scripting.md#powershell-piping)) of stopping a service by its display name:

```powershell
Get-Service -DisplayName "telnet" | Stop-Service
```

### Get-EventLog

Get-EventLog allows you to access event logs on your computer. It helps in analyzing system events and troubleshooting. Here's an example of retrieving the Application event log:

```powershell
Get-EventLog -LogName Application -Newest 100
```

### Invoke-WebRequest

[Invoke-WebRequest](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest?view=powershell-7.3) allows you to send HTTP requests and retrieve web content. It's useful for automating web interactions. Here's an example of downloading a file from a URL:

```powershell
Invoke-WebRequest -Uri "https://example.com/file.txt" -OutFile "C:\Path\To\file.txt"
```

## Formatting Output

### Export-CSV

[Export-CSV](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/export-csv?view=powershell-7.3) enables you to export PowerShell objects to a CSV (Comma-Separated Values) file. It's useful for storing and analyzing data. Here's an example of exporting process information to a CSV file:

```powershell
Get-Process | Export-CSV -Path "C:\Path\To\ProcessReport.csv" -NoTypeInformation

```

### Format-Table

[Format-Table](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/format-table?view=powershell-7.3) allows you to format and display PowerShell output in a tabular form. It's handy for better readability and presentation. Here's an example of formatting the output of the Get-Process command:

```powershell
Get-Process | Format-Table -AutoSize
```

## Advanced Commands

### Invoke-Command

[Invoke-Command](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/invoke-command?view=powershell-7.3) enables you to execute commands on remote systems or run commands in the background. It provides a way to manage and automate tasks across multiple machines. Here's an example of how to execute a command on a remote system:

```powershell
Invoke-Command -ComputerName "Computer1" -ScriptBlock { Get-Process }
```

### Parallel Execution

The [ForEach-Object -Parallel](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/foreach-object?view=powershell-7.3) command allows for parallel processing of data, making your scripts more efficient. It splits the input into multiple threads and processes them concurrently. Here's an example of how to parallelize a loop to perform actions on multiple computers simultaneously:

```powershell
$Computers = "Computer1", "Computer2", "Computer3"

$Computers | ForEach-Object -Parallel {
    $Computer = $_
    Invoke-Command -ComputerName $Computer -ScriptBlock {
        # Perform actions on each remote computer here
        # Example: Get the system uptime
        $Uptime = (Get-WmiObject -Class Win32_OperatingSystem).LastBootUpTime
        Write-Output "Uptime on $env:COMPUTERNAME: $Uptime"
    }
}
```

## Conclusion

PowerShell is a versatile tool for automating tasks, managing systems, and performing various administrative tasks in Windows environments. This cheat sheet covered essential commands, from basic system information retrieval to more advanced concepts like parallel processing and remote command execution. By familiarizing yourself with these commands and their usage, you can become more efficient and effective in your PowerShell scripting journey. Happy scripting!

(Note: While this blog post aims to provide a comprehensive overview of the mentioned commands, it is essential to refer to the [official PowerShell documentation](https://learn.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7.3) for in-depth explanations and additional examples.)

### Additional PagerTree Cheat Sheets

* [Docker Command Cheat Sheet](https://pagertree.com/blog/docker-commands-cheat-sheet)
* [Ruby on Rails Cheat Sheet](https://pagertree.com/blog/ruby-on-rails-cheat-sheet)
* [PromQL Cheat Sheet](https://pagertree.com/blog/promql-cheat-sheet-a-quick-guide-to-prometheus-query-language)
