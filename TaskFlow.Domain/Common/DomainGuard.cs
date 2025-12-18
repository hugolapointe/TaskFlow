namespace TaskFlow.Domain.Common;

using System;
using System.Text.RegularExpressions;

public static class DomainGuard {

    public static class Against {

        public static T Null<T>(T? value, string paramName) {

            if (value is null) 
                throw new ArgumentNullException(paramName);

            return value;
        }

        public static string NullOrEmpty(string? value, string paramName) {

            if (string.IsNullOrWhiteSpace(value)) 
                throw new ArgumentException("Value is required.", paramName);

            return value.Trim();
        }

        public static void InvalidLength(string value, string paramName, int maxLength, int minLength = 0) {

            if (value.Length < minLength) 
                throw new ArgumentException("Value is too short.", paramName);

            if (value.Length > maxLength) 
                throw new ArgumentException("Value exceeds max length.", paramName);
        }

        public static void NotLetters(string value, string paramName, string pattern = "^[A-Za-z]+$") {

            if (!Regex.IsMatch(value, pattern, RegexOptions.CultureInvariant))
                throw new ArgumentException("Letters only.", paramName);
        }

        public static void NotId(Guid id, string paramName) {

            if (id == Guid.Empty) throw new ArgumentException("Id must be a non-empty GUID.", paramName);
        }
    }
}
